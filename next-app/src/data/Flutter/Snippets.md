# User Input in Flutter

In Flutter, user input is commonly collected using the `TextField` widget along with a `TextEditingController`.

## Step 1: Create a Controller

Use a `TextEditingController` to retrieve and manage the text input by the user.

```dart
TextEditingController myController = TextEditingController();
```

Declare the controller **inside a `StatefulWidget`** to manage input dynamically and dispose of it properly later.

## Step 2: Create a TextField

Use the controller with a `TextField` to link the user input:

```dart
TextField(
  controller: myController,
  decoration: InputDecoration(
    border: OutlineInputBorder(),
    hintText: "Type your name",
  ),
),
```

You can customize the `InputDecoration` to show labels, icons, helper text, error text, etc.

## Step 3: Access User Input

You can access the text entered by the user with:

```dart
String userInput = myController.text;
```

Example:

```dart
ElevatedButton(
  onPressed: () {
    print("User typed: ${myController.text}");
  },
  child: Text("Submit"),
),
```

## Best Practices

## Always dispose of controllers

```dart
@override
void dispose() {
  myController.dispose();
  super.dispose();
}
```

This prevents **memory leaks** by freeing up the resources used by the controller.

## Full Example

```dart
class MyForm extends StatefulWidget {
  const MyForm({super.key});

  @override
  State<MyForm> createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final TextEditingController myController = TextEditingController();

  @override
  void dispose() {
    myController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: myController,
          decoration: InputDecoration(
            border: OutlineInputBorder(),
            hintText: "Type your name",
          ),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            print("User typed: ${myController.text}");
          },
          child: Text("Submit"),
        )
      ],
    );
  }
}
```
