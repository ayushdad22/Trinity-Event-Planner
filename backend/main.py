from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Event model
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    society = db.Column(db.String(120), nullable=True)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    venue = db.Column(db.String(150), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    link = db.Column(db.String(255), nullable=True)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "society": self.society,
            "date": self.date,
            "time": self.time,
            "venue": self.venue,
            "address": self.address,
            "desc": self.description,
            "link": self.link,
            "lat": self.lat,
            "lng": self.lng
        }

# Create DB
with app.app_context():
    db.create_all()

# GET all events
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# GET event by ID
@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

# Optional: POST to create event
@app.route('/events', methods=['POST'])
def create_event():
    data = request.json

    event = Event(
        title=data.get('title'),
        category=data.get('category'),
        society=data.get('society'),
        date=data.get('date'),
        time=data.get('time'),
        venue=data.get('venue'),
        address=data.get('address'),
        description=data.get('desc'),
        link=data.get('link'),
        lat=data.get('lat'),
        lng=data.get('lng')
    )

    db.session.add(event)
    db.session.commit()

    return jsonify(event.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
