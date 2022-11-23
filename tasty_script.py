import json
import requests

metadata_url = "http://api.coolcats.com/"
total_supply = 10000

metadata = []

for i in range(10000):
    metadata.append(requests.get(metadata_url + str(i)).json())

# export to json
with open('metadata.json', 'w') as f:
    json.dump(metadata, f) 