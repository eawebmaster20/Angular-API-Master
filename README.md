
# Angular API Master

## Objective
This project demonstrates the use of Angular to interact with external APIs, focusing on proficiency in data fetching, error handling, authentication, optimization, and environment configuration.

The project uses the **JSONPlaceholder API** to perform CRUD operations and other advanced features like pagination, caching, and lazy loading.

## Project Requirements
- **API Client Service**: The service interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) and supports:
  - GET, POST, PUT, DELETE operations
  - Error handling and observable-based architecture
- **Components**:
  - List posts
  - Display a single post and its comments
  - Create a new post
  - Edit an existing post
- **Error Handling**: Implements a service to display user-friendly error messages and retry logic for failed requests.
- **HTTP Interceptor**: Adds a mock authentication token to all outgoing requests and logs requests and responses.
- **Pagination**: Handles paginated data fetching using query parameters.
- **Caching**: Implements a simple cache for GET requests and a mechanism to clear the cache.
- **Environment Configuration**: Supports different environments (development, staging, production) with specific API URLs.
- **Lazy Loading**: Implements lazy loading for the post detail module.
- **Unit Tests**: Includes tests for the API client service and components.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/angular-api-master.git
   cd angular-api-master
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```
   The app will be available at \`http://localhost:4200/\`.

4. Build for production:
   ```bash
   ng build --configuration production
   ```

## Available NPM Scripts

- \`ng serve\`: Start the development server
- \`ng build\`: Build the application
- \`ng lint\`: Run linting on the project
- \`ng test\`: Run unit tests
- \`ng e2e\`: Run end-to-end tests (if implemented)

## Project Structure

- **src/app/services/api.service.ts**: Handles API interactions (GET, POST, PUT, DELETE) with the JSONPlaceholder API.
- **src/app/interceptors/auth.interceptor.ts**: Adds authentication tokens to requests and logs HTTP events.
- **src/app/components/**: Contains all components for listing, creating, editing posts, and viewing post details.
- **src/app/pagination/**: Implements pagination logic.
- **src/app/error-handling/**: Implements error handling services and retry logic.
- **src/environments/**: Configuration for development and production environments.

## Key Features

- **HTTP Client**: Built using Angular's HttpClient with observables for asynchronous requests.
- **Error Handling**: Global error handler for catching network and API-related issues.
- **Logging Using HttpInterceptors**: requests are intercepted and logged.
- **Caching**: GET requests are cached to reduce network requests.
- **Infinite Scroll**: Data fetched in pages using query parameters.
- **Lazy Loading**: Post detail module is loaded lazily to optimize performance.
- **Unit Testing**: Components and services are covered by unit tests using Angular's testing utilities.

## Future Improvements
- Add end-to-end testing with Cypress or Protractor.

## License
This project is licensed under the MIT License.
