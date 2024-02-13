"""Create Everyting

Revision ID: 02ed57ceca4b
Revises: 
Create Date: 2024-02-13 11:18:45.157802

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02ed57ceca4b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('passengers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('_password', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('is_admin', sa.String(), nullable=True),
    sa.Column('passport_number', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pilots',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('flights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('flight_number', sa.String(), nullable=True),
    sa.Column('airways', sa.String(), nullable=True),
    sa.Column('departure_date', sa.String(), nullable=True),
    sa.Column('time', sa.String(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('pilot_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['pilot_id'], ['pilots.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('destinations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('departure', sa.String(), nullable=True),
    sa.Column('arrival', sa.String(), nullable=True),
    sa.Column('flight_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['flight_id'], ['flights.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('flight_passenger_association',
    sa.Column('flight_id', sa.Integer(), nullable=True),
    sa.Column('passenger_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['flight_id'], ['flights.id'], ),
    sa.ForeignKeyConstraint(['passenger_id'], ['passengers.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('flight_passenger_association')
    op.drop_table('destinations')
    op.drop_table('flights')
    op.drop_table('pilots')
    op.drop_table('passengers')
    # ### end Alembic commands ###