from asyncio.events import get_event_loop
from typing import get_type_hints
import numpy as np
import websockets
import json
import asyncio


class Scraper:
    def __init__(self):
        self.local_ws = 'ws://localhost:3000'

    async def update_datas(self):
        async with websockets.connect(self.local_ws) as ws:
            while True:
                message = {
                    'datas': [{'node': 1, 'random_value': np.random.randint(0, 10)},
                                {'node': 2, 'random_value': np.random.randint(
                                    0, 10)},
                                {'node': 3, 'random_value': np.random.randint(0, 10)}],
                    'id': 'datas',
                }
                await ws.send(json.dumps(message))
                await asyncio.sleep(10)


scraper = Scraper()
asyncio.get_event_loop().run_until_complete(scraper.update_datas())
asyncio.get_event_loop().run_forever()
