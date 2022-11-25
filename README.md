# Eye

This project is a streamlined status reporter built on WebSockets using Django & React.

## To Run

1. Clone the repo
2. `docker compose up --build`

**New Terminal:**

3. `cd api`
4. `python -m venv venv`
5. `source venv/bin/activate || venv\Scripts\activate.bat || venv\Scripts\Activate.ps1` (varies by OS)
6. `pip install -r requirements.txt && python manage.py migrate && python manage.py runserver`

**New Terminal:**

7. `cd frontend`
8. `npm install && npm run dev`