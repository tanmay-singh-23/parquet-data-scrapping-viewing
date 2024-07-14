import requests
from bs4 import BeautifulSoup
import pandas as pd
import os
import re
import pyarrow.parquet as pq

# URL of the page to scrape
url = "https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page"

# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the content of the webpage
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all links that point to Parquet files for February and March 2019
    parquet_links = soup.find_all('a', href=re.compile('.parquet$'))
    
    if parquet_links:
        # Define the local directory where files will be saved
        local_directory = './data'
        
        # Create the directory if it doesn't exist
        os.makedirs(local_directory, exist_ok=True)
        
        # Iterate through each Parquet link found
        for link_tag in parquet_links:
            parquet_url = link_tag['href']
            
            # Check if the URL contains the year and month (assuming file names contain these)
            if '2019-02' in parquet_url or '2019-03' in parquet_url:
                print(f"Downloading {parquet_url}...")
                
                # Send a GET request to download the Parquet file
                parquet_response = requests.get(parquet_url)
                
                # Define the local file path
                file_name = os.path.basename(parquet_url)
                local_file_path = os.path.join(local_directory, file_name)
                
                # Write the content to a file
                with open(local_file_path, 'wb') as file:
                    file.write(parquet_response.content)
                
                print(f"Downloaded {file_name} to {local_file_path}")
                
                # Load the Parquet file into pandas DataFrame
                parquet_file = pq.ParquetFile(local_file_path)
                df = parquet_file.read().to_pandas(timestamp_as_object=True)
                
                # Print the first few rows of the DataFrame
                print(df.head())
    else:
        print("No Parquet file links found on the webpage.")
else:
    print("Failed to retrieve the webpage.")





# SAMPLE OUTPUT - 

# Downloading https://d37ci6vzurychx.cloudfront.net/trip-data/yellow_tripdata_2019-02.parquet...
# Downloaded yellow_tripdata_2019-02.parquet to ./data\yellow_tripdata_2019-02.parquet
#    VendorID tpep_pickup_datetime tpep_dropoff_datetime  passenger_count  \
# 0         1  2019-02-01 00:59:04   2019-02-01 01:07:27              1.0   
# 1         1  2019-02-01 00:33:09   2019-02-01 01:03:58              1.0   
# 2         1  2019-02-01 00:09:03   2019-02-01 00:09:16              1.0   
# 3         1  2019-02-01 00:45:38   2019-02-01 00:51:10              1.0   
# 4         1  2019-02-01 00:25:30   2019-02-01 00:28:14              1.0   

#    trip_distance  RatecodeID store_and_fwd_flag  PULocationID  DOLocationID  \
# 0            2.1         1.0                  N            48           234   
# 1            9.8         1.0                  N           230            93   
# 2            0.0         1.0                  N           145           145   
# 3            0.8         1.0                  N            95            95   
# 4            0.8         1.0                  N           140           263   

#    payment_type  fare_amount  extra  mta_tax  tip_amount  tolls_amount  \
# 0             1          9.0    0.5      0.5         2.0           0.0   
# 1             2         32.0    0.5      0.5         0.0           0.0   
# 2             2          2.5    0.5      0.5         0.0           0.0   
# 3             2          5.5    0.5      0.5         0.0           0.0   
# 4             2          5.0    0.5      0.5         0.0           0.0   

#    improvement_surcharge  total_amount  congestion_surcharge airport_fee  
# 0                    0.3          12.3                   0.0        None  
# 1                    0.3          33.3                   0.0        None  
# 2                    0.3           3.8                   0.0        None  
# 3                    0.3           6.8                   0.0        None  
# 4                    0.3           6.3                   0.0        None  