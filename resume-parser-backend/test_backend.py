import requests

# Backend URL
url = "http://127.0.0.1:8000/parse-resume/"

# Open the resume file
files = {'file': open("resume.txt", "rb")}  # Make sure resume.txt exists in backend folder

# Job description
data = {"job_description": "Looking for python and sql developer"}

# Send POST request
response = requests.post(url, files=files, data=data)

# Print response
print(response.json())
