# Parquet Data Application

## Description

The Parquet Data Application is a web-based tool for querying and displaying taxi trip data stored in a MongoDB database. Initially, the data is acquired by scraping data from the NYC TLC Trip Record Data website using Python and BeautifulSoup. The scraped data is then processed into a pandas DataFrame and subsequently loaded into a MongoDB database named parquetDB. The application provides a user-friendly interface to fetch and display data based on various parameters such as license number, dispatch number, date, location IDs, trip metrics, and financial details. The frontend is developed using ReactJS and   styled with CSS, while the backend utilizes Node.js and Express.js.

## Technologies Used

- Frontend:  ReactJS, CSS
- Backend:  Node.js, Express.js
- Database:  MongoDB (with Mongoose)
- Data Acquisition:  Python, BeautifulSoup
- Data Processing:  pandas

## Project Workflow

1. **Data Acquisition**

   - **Web Scraping with BeautifulSoup**: Data is scraped from the [NYC TLC Trip Record Data website](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page) using Python and BeautifulSoup. Parquet files from February and March 2019 are downloaded and loaded into pandas DataFrames for processing and analysis.

2. **Data Storage**

   - **MongoDB Database**: The scraped and processed data is stored in a MongoDB database named parquetDB. Each record represents a taxi trip with detailed attributes including license numbers, trip metrics, financial details etc.

3. **Backend Development**

   - **Node.js and Express.js API**: A RESTful API is developed using Node.js and Express.js to serve as the backend. The API provides multiple endpoints to fetch and filter data stored in MongoDB based on user-defined criteria.

4. **Frontend Implementation**

   - **React.js**: The frontend interface is implemented using React.js along with CSS for styling. Users can input various filters (e.g., license number, date, location IDs) to query and display the data in an interactive table format.
  
## Screenshots

Include screenshots of the Parquet Data Application to showcase its interface and features.

1. Fetch ALL Trips Data -

![image](https://github.com/user-attachments/assets/306a7a08-f1e9-4a24-955a-668cba85b40e)



2. Fetch Specific Trips Data -

![image](https://github.com/user-attachments/assets/815428d7-c1e9-4a11-985d-c25533b3fc89)



3. Fetch Total Trips done Per Location -

![image](https://github.com/user-attachments/assets/c7a72148-9f42-4708-8b9c-bcea28d38b87)



4. Fetch Average Fare per location -

   ![image](https://github.com/user-attachments/assets/d24d87d8-275c-48e0-983c-4971e83b8527)





## Credits

This application was developed by Tanmay Singh and Ojasvi Yadav.
