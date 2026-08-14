import csv

from app.database.session import SessionLocal
from app.models.destination import Destination


CSV_FILE = "Top Indian Places to Visit.csv"


def clean_float(value):
    if not value:
        return 0.0

    value = value.strip()

    try:
        return float(value)
    except ValueError:
        return 0.0


def import_destinations():
    db = SessionLocal()

    try:
        # Clear existing sample destinations
        deleted = db.query(Destination).delete()
        print(f"Removed {deleted} existing destinations.")

        with open(
            CSV_FILE,
            "r",
            encoding="utf-8-sig",
            newline=""
        ) as file:

            reader = csv.DictReader(file)

            destinations = []

            for row in reader:
                destination = Destination(
                    name=row["Name"].strip(),
                    city=row["City"].strip(),
                    state=row["State"].strip(),
                    country="India",
                    description=row["Significance"].strip(),
                    category=row["Type"].strip(),
                    average_cost=clean_float(
                        row["Entrance Fee in INR"]
                    ),
                    rating=clean_float(
                        row["Google review rating"]
                    ),
                    best_time_to_visit=row["Best Time to visit"].strip(),
                )

                destinations.append(destination)

            db.add_all(destinations)
            db.commit()

            print(
                f"Successfully imported {len(destinations)} destinations."
            )

    except Exception as e:
        db.rollback()
        print("Import failed:")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    import_destinations()