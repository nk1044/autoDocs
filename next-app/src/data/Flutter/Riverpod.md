
# Step 1: Add Dependencies

In your `pubspec.yaml`, add Riverpod:

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1 # use the latest version
```

Run:

```bash
flutter pub get
```

---

# Step 2: Wrap Your App with `ProviderScope`

In your `main.dart`:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(const ProviderScope(child: MyApp()));
}

```


# Step 3: Define a Provider

Here’s a simple `StateProvider`:

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

// A provider that exposes an integer counter
final counterProvider = StateProvider<int>((ref) => 0);
```

# Step 4: Use Provider in Widgets

Here’s how you consume the provider in a widget:

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Riverpod Web Example')),
      body: Center(
        child: Text('Counter: $counter', style: const TextStyle(fontSize: 24)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => ref.read(counterProvider.notifier).state++,
        child: const Icon(Icons.add),
      ),
    );
  }
}
```


# Optional: Use Other Provider Types

* `StateNotifierProvider` for more complex logic.
* `FutureProvider` for async operations.
* `StreamProvider` for real-time data.
* `Provider` for static/global values.

Example with `StateNotifierProvider`:

```dart
class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);

  void increment() => state++;
}

final counterNotifierProvider = StateNotifierProvider<CounterNotifier, int>(
  (ref) => CounterNotifier(),
);
```

And use it with:

```dart
ref.read(counterNotifierProvider.notifier).increment();
```

# Hot Reload & Web Compatibility

Riverpod supports hot reload and works seamlessly with Flutter web. Just ensure you avoid using platform-specific plugins unless they support the web too.

