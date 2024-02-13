from flask import Flask, make_response, jsonify, request, session, redirect, url_for, render_template, abort
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os
from flask_bcrypt import generate_password_hash
from flask_bcrypt import check_password_hash
from sqlalchemy import delete, select


from association import flight_passenger_association
from destination import Destination
from flight import Flight
from passenger import Passenger
from pilot import Pilot

from config import app, db, api



@app.route('/')
def home():
    pass

@app.route('/login', methods=['POST'])
def login():
    session.clear()
    data = request.json 
    email = data.get('email')
    password = data.get('password')

    passenger = Passenger.query.filter_by(email=email).first()

    print(f"Login request for user with email: {email}, password: {password}")

    if not passenger or not check_password_hash(passenger._password, password):
        return jsonify({'message': 'Invalid email or password'}), 401

    session['user_id'] = passenger.id

    return jsonify({'id': passenger.id, 'email': passenger.email, 'name': passenger.name}), 200

@app.route('/logout', methods=['GET'])
def logout():
    session.clear()
    return 'Logged out successfully', 200


@app.route('/check_session', methods=['GET'])
def check_session():
    if 'passenger_id' in session:
        passenger = Passenger.query.get(session['passenger_id'])
        return jsonify({'logged_in': True, 'user_name': passenger.name})
    else:
        return jsonify({'logged_in': False})



#####################################################################################################
                                                                         # PILOTS                   #
#####################################################################################################
@app.route('/pilots')
def get_pilots():
    pilots = Pilot.query.all()
    pilot_list = []

    for pilot in pilots:
        pilot_data = {
            'id': pilot.id,
            'name': pilot.name,
            'age': pilot.age
        }
        pilot_list.append(pilot_data)

    return jsonify(pilot_list)


@app.route('/pilots/<int:id>')
def get_pilot(id):
    pilot = Pilot.query.filter_by(id=id).first()

    if not pilot:
        return jsonify({'message': 'Pilot not found'}), 404

    pilot_data = {
        'id': pilot.id,
        'name': pilot.name,
        'age': pilot.age
    }

    return jsonify(pilot_data)


@app.route('/pilots/<int:id>', methods=['DELETE'])
def delete_pilot(id):
    pilot = Pilot.query.filter_by(id=id).first()
    if pilot is None:
        return jsonify({'message': 'Pilot not found'}), 404

    db.session.delete(pilot)
    db.session.commit()

    return jsonify({'message': 'Pilot deleted successfully'})


@app.route('/pilots', methods=['POST'])
def create_pilot():
    data = request.get_json()
    print(data)

    if not all(key in data for key in ['name', 'age']):
        return jsonify({'message': 'Missing required fields'}), 400

    pilot = Pilot(
        name=data['name'],
        age=data['age']
    )

    db.session.add(pilot)
    db.session.commit()

    return jsonify({'message': 'Pilot created successfully'}), 201




########################################################################################################
                                                                            # PASSENGERS               #
########################################################################################################
@app.route('/passengers')
def get_passengers():
    passengers = Passenger.query.all()
    passenger_list = []

    for passenger in passengers:
        passenger_data = {
            'id': passenger.id,
            'name': passenger.name,
            'email': passenger.email,
            'password': passenger.password,
            'age': passenger.age,
            'passport_number': passenger.passport_number
        }
        passenger_list.append(passenger_data)

    return jsonify(passenger_list)


@app.route('/passengers/<int:id>')
def get_passenger(id):
    passenger = Passenger.query.filter_by(id=id).first()

    if not passenger:
        return jsonify({'message': 'Passenger not found'}), 404

    passenger_data = {
        'id': passenger.id,
        'name': passenger.name,
        'email': passenger.email,
        'password': passenger.password,
        'age': passenger.age,
        'passport_number': passenger.passport_number
    }

    return jsonify(passenger_data)


@app.route('/passengers/<int:id>', methods=['DELETE'])
def delete_passenger(id):
    passenger = Passenger.query.filter_by(id=id).first()
    if passenger is None:
        return jsonify({'message': 'Passenger not found'}), 404

    db.session.delete(passenger)
    db.session.commit()

    return jsonify({'message': 'Passenger deleted successfully'})




@app.route('/passengers', methods=['POST'])
def create_passenger():
    data = request.get_json()
    print(data)

    hashed_password = generate_password_hash(data['password']).decode('utf-8')

    passenger = Passenger(
        name=data['name'],
        email=data['email'],
        _password=hashed_password,
        age=data['age'],
        passport_number=data['passport_number'],
        is_admin=data['isAdmin'] 
    )

    db.session.add(passenger)
    db.session.commit()

    return jsonify({'message': 'Passenger created successfully'}), 201

@app.route('/passengers/<int:id>', methods=['PATCH'])
def update_passenger(id):
    data = request.get_json()
    print(data)

    passenger = Passenger.query.filter_by(id=id).first()

    if not passenger:
        return jsonify({'message': 'Passenger not found'}), 404

    if 'name' in data:
        passenger.name = data['name']
    if 'email' in data:
        passenger.email = data['email']
    if 'password' in data:
        hashed_password = generate_password_hash(data['password']).decode('utf-8')
        passenger.password = hashed_password
    if 'age' in data:
        passenger.age = data['age']
    if 'passport_number' in data:
        passenger.passport_number = data['passport_number']

    db.session.commit()

    return jsonify({'message': 'Passenger updated successfully'})

@app.route('/passengers/search', methods=['GET'])
def search_passengers():
    name = request.args.get('name')
    passenger = Passenger.query.filter(Passenger.name.ilike(f'%{name}%')).first()

    if not passenger:
        return jsonify({'message': 'Passenger not found'}), 404

    passenger_data = {
        'id': passenger.id,
        'name': passenger.name,
        'email': passenger.email,
        'password': passenger.password,
        'age': passenger.age,
        'passport_number': passenger.passport_number
    }

    return jsonify(passenger_data)


@app.route('/adminlogin', methods=['POST'])
def admin_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    passenger = Passenger.query.filter_by(email=email).first()

    if not passenger:
        return jsonify({'message': 'Invalid email or password'}), 401

    if not check_password_hash(passenger._password, password):
        return jsonify({'message': 'Invalid email or password'}), 401

    if not passenger.is_admin:
        return jsonify({'message': 'User is not an admin'}), 404

    
    return jsonify({'message': 'Logged in successfully', 'isAdmin': True}), 200


##########################################################################################################
                                                                 #FLIGHTS                                #
##########################################################################################################

@app.route('/flights')
def get_flights():
    flights = Flight.query.all()
    flight_list = []

    for flight in flights:
        flight_data = {
            'id': flight.id,
            'flight_number': flight.flight_number,
            'airways': flight.airways,
            'departure_date': flight.departure_date,
            'price': flight.price
        }
        flight_list.append(flight_data)

    return jsonify(flight_list)

@app.route('/flights/<int:id>')
def get_flight(id):
    flight = Flight.query.filter_by(id=id).first()

    if not flight:
        return jsonify({'message': 'Flight not found'}), 404

    flight_data = {
        'id': flight.id,
        'flight_number': flight.flight_number,
        'airways': flight.airways,
        'departure_date': flight.departure_date,
        'price': flight.price
    }

    return jsonify(flight_data)


@app.route('/flights/<int:id>', methods=['DELETE'])
def delete_flight(id):
    flight = Flight.query.filter_by(id=id).first()
    if flight is None:
        return jsonify({'message': 'Flight not found'}), 404

    db.session.delete(flight)
    db.session.commit()

    return jsonify({'message': 'Flight deleted successfully'})


@app.route('/flights', methods=['POST'])
def create_flight():
    data = request.get_json()
    print(data)

    flight = Flight(
        flight_number=data['flight_number'],
        airways=data['airways'],
        departure_date=data['departure_date'],
        price=data['price'],
        time=data['time'],
        pilot_id=data['pilot_id'], 
    )

    db.session.add(flight)
    db.session.commit()

    return jsonify({'message': 'Flight created successfully'}), 201


#######################################################################################################################
                                                              # DESTINATIONS                                          #
#######################################################################################################################

@app.route('/destinations')
def get_destinations():
    destinations = Destination.query.all()
    destination_list = []

    for destination in destinations:
        destination_data = {
            'id': destination.id,
            'departure': destination.departure,
            'arrival': destination.arrival
        }
        destination_list.append(destination_data)

    return jsonify(destination_list)


@app.route('/destinations/<int:id>')
def get_destination(id):
    destination = Destination.query.filter_by(id=id).first()

    if not destination:
        return jsonify({'message': 'Destination not found'}), 404

    destination_data = {
        'id': destination.id,
        'departure': destination.departure,
        'arrival': destination.arrival
    }

    return jsonify(destination_data)


@app.route('/destinations/<int:id>', methods=['DELETE'])
def delete_destination(id):
    destination = Destination.query.filter_by(id=id).first()
    if destination is None:
        return jsonify({'message': 'Destination not found'}), 404

    db.session.delete(destination)
    db.session.commit()

    return jsonify({'message': 'Destination deleted successfully'})


@app.route('/destinations', methods=['POST'])
def create_destination():
    data = request.get_json()
    print(data)

    destination = Destination(
        departure=data['departure'],
        arrival=data['arrival'],
        flight_id=data['flight_id']
    )

    db.session.add(destination)
    db.session.commit()

    return jsonify({'message': 'Destination created successfully'}), 201


@app.route('/destinations-with-flights', methods=['GET'])
def get_destinations_with_flight_info():
    destinations_with_flight = db.session.query(
        Destination.id,
        Destination.departure,
        Destination.arrival,
        Flight.flight_number,
        Flight.airways,
        Flight.departure_date,
        Flight.time
    ).join(
        Flight, Destination.flight_id == Flight.id
    ).all()

    destination_list = []
    for destination in destinations_with_flight:
        destination_data = {
            'id': destination.id,
            'departure': destination.departure,
            'arrival': destination.arrival,
            'flight_number': destination.flight_number,
            'airways': destination.airways,
            'departure_date': destination.departure_date,
            'time': destination.time
        }
        destination_list.append(destination_data)

    return destination_list






###########################################################################################
                                                                    ## ASSOCIATION TABLE ##
###########################################################################################

@app.route('/update-association', methods=['POST'])
def update_association():
    data = request.get_json()
    print(data)

    flight_number = data['flight_number']
    passenger_id = data['passenger_id']

    flight = Flight.query.filter_by(flight_number=flight_number).first()
    passenger = Passenger.query.get(passenger_id)

    if not flight or not passenger:
        return jsonify({'message': 'Flight or Passenger not found'}), 404

    flight.passengers.append(passenger)
    db.session.commit()

    return jsonify({'message': 'Passenger added to flight successfully'}), 200





@app.route('/passengers/<int:passenger_id>/flights', methods=['GET'])
def fetch_passenger_flights(passenger_id):
    try:
        passenger = Passenger.query.get(passenger_id)
        if not passenger:
            return jsonify({'message': 'Passenger not found'}), 404
        
        flights = []
        for flight in passenger.flights:
            destination = Destination.query.filter_by(flight_id=flight.id).first()
            if not destination:
                continue
            flight_data = {
                'flight_id': flight.id,
                'flight_number': flight.flight_number,  
                'departure': destination.departure,
                'arrival': destination.arrival,
                # Add more fields as needed
            }
            flights.append(flight_data)
        
        return jsonify(flights), 200
    except Exception as e:
        print('Error fetching passenger flights:', e)
        return jsonify({'message': 'Internal server error'}), 500


@app.route('/passengers/flights/<int:flight_id>', methods=['DELETE'])
def cancel_flight(flight_id):
    try:
        flight = Flight.query.get(flight_id)
        if not flight:
            return jsonify({'message': 'Flight not found'}), 404

        passenger_id = request.args.get('passenger_id')
        if not passenger_id:
            return jsonify({'message': 'Passenger ID not provided'}), 400

        association = FlightPassengerAssociation.query.filter_by(flight_id=flight_id, passenger_id=passenger_id).first()
        if not association:
            return jsonify({'message': 'Association not found'}), 404

        print('Deleting association with flight ID:', flight_id, 'and passenger ID:', passenger_id)
        
        db.session.delete(association)
        db.session.commit()

        return jsonify({'message': 'Flight canceled successfully'}), 200
    except Exception as e:
        print('Error canceling flight:', str(e))
        db.session.rollback()
        return jsonify({'message': 'Internal server error'}), 500
