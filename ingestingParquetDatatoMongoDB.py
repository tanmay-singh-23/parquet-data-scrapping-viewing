import pyarrow.parquet as pq
from pymongo import MongoClient
import os
 
# MongoDB connection settings
mongo_uri = "mongodb://localhost:27017/"
db_name = "parquetDB"
collection_name = "parquetCollection"
 
# Directory containing the Parquet files
download_dir = 'data'
 
# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[db_name]
collection = db[collection_name]
 
# Function to read Parquet file and insert data into MongoDB
def parquet_to_mongodb(file_path, collection):
    table = pq.read_table(file_path)
    batches = table.to_batches()
    for batch in batches:
        records = batch.to_pydict()
        records = [{k: v[i] for k, v in records.items()} for i in range(len(records[next(iter(records))]))]
        collection.insert_many(records)
 
# Loop through all Parquet files in the directory and insert data into MongoDB
for file_name in os.listdir(download_dir):
    if file_name.endswith('.parquet'):
        file_path = os.path.join(download_dir, file_name)
        parquet_to_mongodb(file_path, collection)
        print(f'Data from {file_path} inserted into MongoDB collection {collection_name}')
 
print("All Parquet files processed.")





# OUTPUT-

# Data from data\fhvhv_tripdata_2019-02.parquet inserted into MongoDB collection parquetCollection
# Data from data\fhvhv_tripdata_2019-03.parquet inserted into MongoDB collection parquetCollection
# Data from data\fhv_tripdata_2019-02.parquet inserted into MongoDB collection parquetCollection
# Data from data\fhv_tripdata_2019-03.parquet inserted into MongoDB collection parquetCollection
# Data from data\green_tripdata_2019-02.parquet inserted into MongoDB collection parquetCollection
# Data from data\green_tripdata_2019-03.parquet inserted into MongoDB collection parquetCollection
# Data from data\yellow_tripdata_2019-02.parquet inserted into MongoDB collection parquetCollection
# Data from data\yellow_tripdata_2019-03.parquet inserted into MongoDB collection parquetCollection
# All Parquet files processed.