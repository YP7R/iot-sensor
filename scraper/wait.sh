#!/bin/bash
while ! nc -z Serveur-node 3000; do sleep 3; done
python scrapper.py