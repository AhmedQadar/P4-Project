from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 
from association import flight_passenger_association


from config import db



class Flight(db.Model):

    __tablename__ = 'flights'

    id = db.Column(Integer, primary_key=True)
    flight_number = db.Column(db.String)
    airways = db.Column(db.String)
    departure_date = db.Column(db.String)
    time = db.Column(db.String)
    price = db.Column(db.Integer)
    pilot_id = db.Column(db.Integer, db.ForeignKey('pilots.id'))
   
    
    
    passengers = db.relationship("Passenger", secondary=flight_passenger_association, back_populates="flights")
    pilot = db.relationship("Pilot", back_populates="flights")
    destinations = db.relationship("Destination", back_populates="flight")


    def __init__(self, flight_number, airways, departure_date,  time, pilot_id,  price):
        self.flight_number = flight_number
        self.airways = airways
        self.departure_date = departure_date
        self.time = time
        self.pilot_id = pilot_id
        self.price = price