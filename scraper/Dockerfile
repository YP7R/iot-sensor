FROM iwane/numpy
WORKDIR /scraper
EXPOSE 3000
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

