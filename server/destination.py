from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 

from config import db

class Destination(db.Model):

    __tablename__ = 'destinations'
     
    id = db.Column(db.Integer, primary_key=True)
    departure = db.Column(db.String)
    arrival = db.Column(db.String)
    flight_id =  db.Column(db.Integer, db.ForeignKey('flights.id'))

    flight = db.relationship("Flight", back_populates="destinations")

    def __init__(self, departure, arrival, flight_id):
        self.departure = departure
        self.arrival = arrival
        self.flight_id = flight_id
        