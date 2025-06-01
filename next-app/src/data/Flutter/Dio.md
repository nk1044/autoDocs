# Step 1: Add Dio to `pubspec.yaml`

```yaml
dependencies:
  dio: ^5.4.0 # Use the latest version
```

Run:

```bash
flutter pub get
```


# Step 2: Import Dio

```dart
import 'package:dio/dio.dart';
```

# Step 3: Make API Calls

## Example: Simple GET Request

```dart
void fetchData() async {
  final dio = Dio();

  try {
    final response = await dio.get('https://jsonplaceholder.typicode.com/posts/1');
    print(response.data);
  } catch (e) {
    print('Error: $e');
  }
}
```


## Example: POST Request with JSON Body

```dart
void createPost() async {
  final dio = Dio();

  try {
    final response = await dio.post(
      'https://jsonplaceholder.typicode.com/posts',
      data: {
        'title': 'foo',
        'body': 'bar',
        'userId': 1,
      },
    );
    print(response.data);
  } catch (e) {
    print('Error: $e');
  }
}
```


# Optional: Add Interceptors (e.g., for logging or auth)

```dart
final dio = Dio();

dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    print('Request: ${options.method} ${options.path}');
    return handler.next(options);
  },
  onResponse: (response, handler) {
    print('Response: ${response.statusCode}');
    return handler.next(response);
  },
  onError: (DioException e, handler) {
    print('Error: ${e.message}');
    return handler.next(e);
  },
));
```


# Timeout Configuration

```dart
final dio = Dio(
  BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 15),
  ),
);
```

# Downloading with Progress

```dart
void downloadFile() async {
  final dio = Dio();
  await dio.download(
    'https://example.com/file.zip',
    '/path/to/save/file.zip',
    onReceiveProgress: (received, total) {
      if (total != -1) {
        print('${(received / total * 100).toStringAsFixed(0)}%');
      }
    },
  );
}
```

Note: File saving paths may differ in Flutter web. Use `html` APIs or `flutter_file_dialog` alternatives if needed.


# Summary

| Task           | Code Snippet                             |
| -------------- | ---------------------------------------- |
| GET            | `dio.get('/endpoint')`                   |
| POST           | `dio.post('/endpoint', data: {...})`     |
| Error handling | `try-catch` around Dio calls             |
| Auth headers   | `dio.options.headers['Authorization'] =` |
| Interceptors   | `dio.interceptors.add(...)`              |
| Timeout config | `BaseOptions(connectTimeout: ..., ...)`  |
