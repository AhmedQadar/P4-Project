from random import randint, choice as rc
from faker import Faker
from config import db, app
import json
from random import choice
from destination import Destination
from flight import Flight
from passenger import Passenger
from association import flight_passenger_association 
from pilot import Pilot
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from datetime import datetime, timedelta
import random
from random import shuffle




fake = Faker()

africa_flights = [
    {"flightNumber": "ABC123", "airways": "Air Africa", "departureDate": "1st Mar, 2024", "price": 500, "duration": "3 hours"},
    {"flightNumber": "DEF456", "airways": "Safari Airways", "departureDate": "2nd Mar, 2024", "price": 550, "duration": "5 hours"},
    {"flightNumber": "GHI789", "airways": "African Wings", "departureDate": "3rd Mar, 2024", "price": 600, "duration": "7 hours"},
    {"flightNumber": "JKL012", "airways": "Savannah Airlines", "departureDate": "4th Mar, 2024", "price": 650, "duration": "9 hours"},
    {"flightNumber": "MNO345", "airways": "Desert Sky", "departureDate": "5th Mar, 2024", "price": 700, "duration": "10 hours"},
    {"flightNumber": "PQR678", "airways": "Africa Express", "departureDate": "6th Mar, 2024", "price": 750, "duration": "8 hours"},
    {"flightNumber": "STU901", "airways": "Sahara Airways", "departureDate": "7th Mar, 2024", "price": 800, "duration": "6 hours"},
    {"flightNumber": "VWX234", "airways": "Jungle Jet", "departureDate": "8th Mar, 2024", "price": 850, "duration": "4 hours"},
    {"flightNumber": "YZA567", "airways": "Wildlife Air", "departureDate": "9th Mar, 2024", "price": 900, "duration": "2 hours"},
    {"flightNumber": "BCD890", "airways": "Horizon Aviation", "departureDate": "10th Mar, 2024", "price": 950, "duration": "3 hours"},
    {"flightNumber": "EFG123", "airways": "African Wings", "departureDate": "11th Mar, 2024", "price": 600, "duration": "7 hours"},
    {"flightNumber": "HIJ456", "airways": "Savannah Airlines", "departureDate": "12th Mar, 2024", "price": 650, "duration": "9 hours"},
    {"flightNumber": "KLM789", "airways": "Desert Sky", "departureDate": "13th Mar, 2024", "price": 700, "duration": "10 hours"},
    {"flightNumber": "NOP012", "airways": "Africa Express", "departureDate": "14th Mar, 2024", "price": 750, "duration": "8 hours"},
    {"flightNumber": "QRS345", "airways": "Sahara Airways", "departureDate": "15th Mar, 2024", "price": 800, "duration": "6 hours"},
    {"flightNumber": "TUV678", "airways": "Jungle Jet", "departureDate": "16th Mar, 2024", "price": 850, "duration": "4 hours"},
    {"flightNumber": "WXY901", "airways": "Wildlife Air", "departureDate": "17th Mar, 2024", "price": 900, "duration": "2 hours"},
    {"flightNumber": "ZAB234", "airways": "Horizon Aviation", "departureDate": "18th Mar, 2024", "price": 950, "duration": "3 hours"},
    {"flightNumber": "CDE567", "airways": "Air Africa", "departureDate": "19th Mar, 2024", "price": 500, "duration": "3 hours"},
    {"flightNumber": "EFG890", "airways": "Safari Airways", "departureDate": "20th Mar, 2024", "price": 550, "duration": "5 hours"}
]


africa_destinations = [
    {"departureCity": "Cairo", "arrivalCity": "Cape Town"},
    {"departureCity": "Lagos", "arrivalCity": "Nairobi"},
    {"departureCity": "Accra", "arrivalCity": "Johannesburg"},
    {"departureCity": "Dar es Salaam", "arrivalCity": "Casablanca"},
    {"departureCity": "Addis Ababa", "arrivalCity": "Tunis"},
    {"departureCity": "Dakar", "arrivalCity": "Abuja"},
    {"departureCity": "Khartoum", "arrivalCity": "Luanda"},
    {"departureCity": "Algiers", "arrivalCity": "Nouakchott"},
    {"departureCity": "Kigali", "arrivalCity": "Maputo"},
    {"departureCity": "Kinshasa", "arrivalCity": "Gaborone"},
    {"departureCity": "Cairo", "arrivalCity": "Cape Town"},
    {"departureCity": "Lagos", "arrivalCity": "Nairobi"},
    {"departureCity": "Accra", "arrivalCity": "Johannesburg"},
    {"departureCity": "Dar es Salaam", "arrivalCity": "Casablanca"},
    {"departureCity": "Addis Ababa", "arrivalCity": "Tunis"},
    {"departureCity": "Dakar", "arrivalCity": "Abuja"},
    {"departureCity": "Khartoum", "arrivalCity": "Luanda"},
    {"departureCity": "Algiers", "arrivalCity": "Nouakchott"},
    {"departureCity": "Kigali", "arrivalCity": "Maputo"},
    {"departureCity": "Kinshasa", "arrivalCity": "Gaborone"}
]

with app.app_context():
    print("Deleting all records...")
    db.session.query(Destination).delete()
    db.session.query(Flight).delete()
    db.session.query(Passenger).delete()
    db.session.query(Pilot).delete()
    db.session.query(flight_passenger_association).delete()
    db.session.commit()

    print("Creating Pilots...")
    pilots = []
    for _ in range(20):
        pilot = Pilot(
            name=fake.name(),
            age=randint(18, 100),
        )
        pilots.append(pilot)
    db.session.add_all(pilots)

    print("Creating Passengers...")
    passengers = []
    for _ in range(40):
        password = fake.password()
        passenger = Passenger(
            name=fake.name(),
            email=fake.email(),
            _password=password,  
            age=randint(18, 100),
            is_admin=False,
            passport_number=fake.ssn()
        )
        passengers.append(passenger)

    db.session.add_all(passengers)


    print("Creating Flights...")
    for flight_data in africa_flights:
        flight_number = flight_data["flightNumber"]
        airways = flight_data["airways"]
        departure_date = flight_data["departureDate"]
        price = flight_data["price"]
        duration = flight_data["duration"]

        random_pilot = choice(Pilot.query.all())

        
        flight = Flight(
            flight_number=flight_number,
            airways=airways,
            departure_date=departure_date,
            price=price,
            time=duration,
            pilot_id=random_pilot.id
        )
        db.session.add(flight)

        
      

       
       
        for _ in range(randint(1, 5)):  
            passenger = choice(passengers)
            flight.passengers.append(passenger)


    db.session.commit()

    print("Creating Destinations...")
    flights = Flight.query.all()
    shuffle(flights)

    
    for destination_data, flight in zip(africa_destinations, flights):
        departure_city = destination_data["departureCity"]
        arrival_city = destination_data["arrivalCity"]

        destination = Destination(
            departure=departure_city,
            arrival=arrival_city,
            flight_id=flight.id
        )
        db.session.add(destination)

   
    db.session.commit()