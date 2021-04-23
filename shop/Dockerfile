FROM python:latest

EXPOSE 5000

WORKDIR /shop
COPY . /shop
RUN pip install -r requirements.txt

CMD python shop.py
