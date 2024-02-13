from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import validates 


from config import db



flight_passenger_association = db.Table('flight_passenger_association',
    db.Column('flight_id', db.Integer, db.ForeignKey('flights.id')),
    db.Column('passenger_id', db.Integer, db.ForeignKey('passengers.id'))
)