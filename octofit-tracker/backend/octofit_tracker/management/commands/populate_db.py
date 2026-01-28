from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Usuń istniejące dane
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Tworzenie drużyn
        marvel = Team.objects.create(name='marvel', description='Marvel Team')
        dc = Team.objects.create(name='dc', description='DC Team')

        # Tworzenie użytkowników
        users = [
            User.objects.create(email='ironman@marvel.com', name='Iron Man', team=marvel.name),
            User.objects.create(email='captain@marvel.com', name='Captain America', team=marvel.name),
            User.objects.create(email='batman@dc.com', name='Batman', team=dc.name),
            User.objects.create(email='superman@dc.com', name='Superman', team=dc.name),
        ]

        # Tworzenie aktywności
        Activity.objects.create(user=users[0].email, type='run', duration=30, date=date(2023,1,1))
        Activity.objects.create(user=users[1].email, type='cycle', duration=45, date=date(2023,1,2))
        Activity.objects.create(user=users[2].email, type='swim', duration=60, date=date(2023,1,3))
        Activity.objects.create(user=users[3].email, type='walk', duration=20, date=date(2023,1,4))

        # Tworzenie leaderboard
        Leaderboard.objects.create(user=users[0].email, points=100, rank=1)
        Leaderboard.objects.create(user=users[1].email, points=90, rank=2)
        Leaderboard.objects.create(user=users[2].email, points=80, rank=3)
        Leaderboard.objects.create(user=users[3].email, points=70, rank=4)

        # Tworzenie workoutów
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='easy')
        Workout.objects.create(name='Situps', description='Do 30 situps', difficulty='medium')
        Workout.objects.create(name='Plank', description='Hold plank for 1 min', difficulty='hard')

        self.stdout.write(self.style.SUCCESS('Baza octofit_db została wypełniona przykładowymi danymi!'))
