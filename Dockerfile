FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project code to the container
RUN mkdir -p /app/staticfiles
COPY . .

# Add env variables and print statement
ARG DATABASE_HOST
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG PROD

ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV ARG PROD=$PROD

RUN echo "PROD: $PROD, DB_HOST: $DATABASE_HOST, DB_PASS: $DATABASE_PASSWORD, DB_NAME: $DATABASE_NAME, DB_USER: $DATABASE_USER"

# Run the initial Django commands
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic --noinput

# Expose the port that your Django app will run on
EXPOSE 8080

# Set the command to run your Django app using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "web_stock_project.wsgi:application", "--timeout", "90", "--log-level", "debug"]
