from asyncio.events import get_event_loop
import numpy
# from typing import get_type_hints
import numpy as np
import websockets
import json
import asyncio
import time
from datetime import datetime
import os

class Scraper:
    def __init__(self):
        self.local_ws = f"ws://{os.environ['API_URL']}"

    async def update_datas(self):
        async with websockets.connect(self.local_ws) as ws:
            while True:
                message = {
                    'datas': [self.sensor_value(i) for i in range(7)],
                    'id': 'datas',
                }
                await ws.send(json.dumps(message))
                await asyncio.sleep(5)

    # Faking datas, because sensors are not public
    def sensor_value(self,sensor_id):
        sensor = {'sensor': sensor_id,
         'battery': np.random.randint(60, 100),
         'humidity': np.random.randint(20, 50),
         'location': ['Garden','Bedroom','WC','Living Room','Kitchen','Room','Shower'][sensor_id],
         'luminance': np.random.randint(100, 140),
         'motion': np.random.choice(["True", "False"]),
         'temperature': np.random.randint(20, 40),
         'updateTime': datetime.now().strftime("%d.%m.%Y %H:%M:%S"),
         'controller':np.random.randint(0,1)}
        return sensor


scraper = Scraper()
asyncio.get_event_loop().run_until_complete(scraper.update_datas())
asyncio.get_event_loop().run_forever()
