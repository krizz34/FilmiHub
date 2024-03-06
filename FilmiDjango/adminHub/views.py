from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm
from datetime import datetime
from django.utils import timezone
from django.db.models import Q
from django.db.models import Sum


from rest_framework import status
from rest_framework.authtoken.models import Token

from .forms import CustomUserCreationForm

from .models import movie
from .forms import movieForm
from .serializers import movieSerializer

from .models import BookingRegister
from .serializers import bookingSerializer




@api_view(['POST'])
@permission_classes((AllowAny,))
def apiSignup(request):
    form = CustomUserCreationForm(data=request.data)
    
    if form.is_valid():
        user = form.save()
        return Response("account created successfully", status=status.HTTP_201_CREATED)
    else:
        print(form.errors)  # Log or print the form errors for debugging
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def apiLogin(request):
    username_instance = request.data.get("username")
    password_instance = request.data.get("password")
    
    if username_instance is None or password_instance is None:
        return Response({'error': 'Please provide both username and password'}, status=HTTP_400_BAD_REQUEST)
    else:
        user = authenticate(username=username_instance, password=password_instance)
        
        if not user:
            return Response({'error': 'Invalid Credentials'}, status=HTTP_404_NOT_FOUND)
        else:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': '{}'.format(token.key)}, status=HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apiLogout(request):
    request.auth.delete()
    return Response({'detail': 'Logout successful'}, status=status.HTTP_200_OK)






@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apiCreate(request):
    createData = movieForm(request.data)
    
    if createData.is_valid():
        new_movie_start_date = createData.cleaned_data['movieFromDate']
        new_movie_end_date = createData.cleaned_data['movieEndDate']
        new_movie_time_slot = createData.cleaned_data['movieTime']

        # Check for existing movies with the same date and time slot
        conflicting_movies = movie.objects.filter(
            (Q(movieFromDate__lte=new_movie_start_date) & Q(movieEndDate__gte=new_movie_start_date)) |
            (Q(movieFromDate__lte=new_movie_end_date) & Q(movieEndDate__gte=new_movie_end_date)) |
            (Q(movieFromDate__gte=new_movie_start_date) & Q(movieEndDate__lte=new_movie_end_date)),
            Q(movieTime=new_movie_time_slot)
        )

        if conflicting_movies.exists():
            return Response({'error': 'A movie already exists with the same date and time slot'}, status=status.HTTP_400_BAD_REQUEST)

        # Convert the date format before saving to the database
        createData.cleaned_data['movieFromDate'] = new_movie_start_date.strftime('%Y-%m-%d')
        createData.cleaned_data['movieEndDate'] = new_movie_end_date.strftime('%Y-%m-%d')
        
        product = createData.save()
        return Response({'id': product.id}, status=status.HTTP_201_CREATED)

    return Response(createData.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiRead(request):
    current_date = timezone.now().date()
    admin_movies = movie.objects.filter(Q(movieEndDate__gt=current_date))
    serializer = movieSerializer(admin_movies, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiAdminRead(request):
    products = movie.objects.all()
    serializer = movieSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes((AllowAny,))
def apiReadSpecial(request, pk):
    try:
        product = movie.objects.get(pk=pk)
        serializer = movieSerializer(product)
        return Response(serializer.data)
    except movie.DoesNotExist:
        return Response({'error': 'Medicine not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def apiUpdate(request, pk):
    product_instance = get_object_or_404(movie, pk=pk)

    # Convert the date format before saving to the database
    request.data['movieFromDate'] = datetime.strptime(request.data['movieFromDate'], '%Y-%m-%d').date()
    request.data['movieEndDate'] = datetime.strptime(request.data['movieEndDate'], '%Y-%m-%d').date()

    form = movieForm(request.data, instance=product_instance)

    if form.is_valid():
        new_movie_start_date = form.cleaned_data['movieFromDate']
        new_movie_end_date = form.cleaned_data['movieEndDate']
        new_movie_time_slot = form.cleaned_data['movieTime']

        # Check for existing movies with the same date and time slot
        conflicting_movies = movie.objects.filter(
            (Q(movieFromDate__lte=new_movie_start_date) & Q(movieEndDate__gte=new_movie_start_date)) |
            (Q(movieFromDate__lte=new_movie_end_date) & Q(movieEndDate__gte=new_movie_end_date)) |
            (Q(movieFromDate__gte=new_movie_start_date) & Q(movieEndDate__lte=new_movie_end_date)),
            Q(movieTime=new_movie_time_slot)
        ).exclude(pk=pk)  # Exclude the current movie being updated from the conflict check

        if conflicting_movies.exists():
            return Response({'error': 'A movie already exists with the same date and time slot'}, status=status.HTTP_400_BAD_REQUEST)

        form.save()
        serializer = movieSerializer(product_instance)
        return Response(serializer.data)
    else:
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def apiDelete(request, pk):
    try:
        product_instance = movie.objects.get(pk=pk)
    except product_instance.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    product_instance.delete()
    return Response("deleted successfully")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiSearch(request, movieName):
    movies = movie.objects.filter(movieName__icontains=movieName)
    
    if movies.exists():
        serializer = movieSerializer(movies, many=True)
        return Response(serializer.data)
    else:
        return Response({'error': 'movie not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiCheckAvailability(request, bookingDate, bookingTime):
    try:
        total_bookings = BookingRegister.objects.filter(
            bookingDate=bookingDate,
            bookingTime=bookingTime
        ).aggregate(Sum('noOfBookings'))['noOfBookings__sum']

        total_bookings = total_bookings or 0
        total_capacity = 10

        seats_available = total_capacity - total_bookings

        if seats_available > 0:
            return Response({'seatsAvailable': seats_available}, status=status.HTTP_200_OK)
        else:
            return Response({'seatsAvailable': 'Sorry! Housefull'}, status=status.HTTP_200_OK)

    except BookingRegister.DoesNotExist:
        return Response({'error': 'No bookings found for the specified date and time'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apiCreateBooking(request, movie_id):
    movie_instance = movie.objects.get(pk=movie_id)

    seats_available = request.data.get('seatsAvailable', 0)
    no_of_bookings = int(request.data.get('noOfBookings', 0))

    # Initialize booking_data before appending to seat_numbers
    booking_data = {
        'user': request.user.id,
        'movie': movie_instance.id,
        'bookingDate': request.data.get('bookingDate'),
        'bookingTime': movie_instance.movieTime,
        'noOfBookings': request.data.get('noOfBookings'),
        'seatNumbers': ''
    }

    seat_numbers = []

    for i in range(no_of_bookings, 0, -1):
        seat_number = seats_available - i + 1
        seat_numbers.append(f'LUXE {seat_number}')

    # Now join seat_numbers and assign to 'seatNumbers' in booking_data
    booking_data['seatNumbers'] = ', '.join(seat_numbers)

    # test
    print(f"Received booking data: {booking_data}")

    serializer = bookingSerializer(data=booking_data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Booking record created successfully'}, status=status.HTTP_201_CREATED)
    else:
        print(f"Serialized data: {serializer.data}")  # Add this line
        print(f"Request data: {request.data}")  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def apiBookingRead(request):
    user_bookings = BookingRegister.objects.filter(user=request.user)
    serializer = bookingSerializer(user_bookings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)