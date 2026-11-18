Chef’s Menu Manager — Part 3

Project overview

Chef’s Menu Manager is an enhanced React Native application built with Expo and TypeScript. Part 3 continues the Part 2 project and adds menu-item management, search and filtering, menu statistics, and a refined user interface.

Technologies

* React Native
* Expo
* TypeScript
* Visual Studio Code
* Git and GitHub

Features implemented

* Add a menu item with a name, description, course and price.
* Edit an existing menu item and save updated information.
* Delete a menu item after a confirmation prompt.
* Search menu items by name.
* Filter menu items by Starter, Main Course or Dessert.
* Clear the search and course filter to show all items.
* Display the total number of menu items.
* Calculate the average menu price.
* Display the number and percentage of items in each course.
* Validate required fields and reject invalid or non-positive prices.
* Provide success, error and delete-confirmation feedback.
* Use reusable rendering functions, shared colour constants, TypeScript types and memoised derived data.
* Present a redesigned cream, olive and warm-neutral interface inspired by the supplied visual reference.

Change log — changes since Part 2

1. Reorganised the application into Home, Menu, Insights and Profile views.
2. Added edit functionality to update an existing dish.
3. Added delete functionality with a confirmation alert.
4. Added name-based search.
5. Added course filters for Starter, Main Course and Dessert.
6. Added a clear-search-and-filters action.
7. Added total menu item and average price statistics.
8. Added course counts and percentage bars.
9. Improved validation and user feedback.
10. Refined layout, typography, spacing, cards, colour palette and bottom navigation.
11. Added reusable functions for the header, statistic cards and dish cards.
12. Added TypeScript types for menu items, courses and screen navigation.

Important implementation note

The sample dishes are initial demonstration data held in React state. This version does not add database or device-storage persistence. Changes update the interface immediately while the application is running, but may reset when the app is restarted.

How to run

1. Open the existing Part 2 project folder in Visual Studio Code.
2. Replace the contents of App.tsx with the supplied Part 3 App.tsx.
3. Keep the existing package.json and index.ts.
4. Open the terminal in the project folder.
5. Run npm install if dependencies have not already been installed.
6. Run npx expo start.
7. Open the project in Expo Go or an available emulator.

No additional package is required by this implementation.

MAST5112 – Complete Reference List

1. React Native

These references cover the components and functionality used throughout your application.

1. React Native (n.d.) Text. Available at: React Native – Text⁠￼ (Accessed: 16 November 2026).
2. React Native (n.d.) TextInput. Available at: React Native – TextInput⁠￼ (Accessed: 16 November 2026).
3. React Native (n.d.) View. Available at: React Native – View⁠￼ (Accessed: 16 November 2026).
4. React Native (n.d.) Pressable. Available at: React Native – Pressable⁠￼ (Accessed: 16 November 2026).
5. React Native (n.d.) Modal. Available at: React Native – Modal⁠￼ (Accessed: 16 November 2026).
6. React Native (n.d.) FlatList. Available at: React Native – FlatList⁠￼ (Accessed: 16 November 2026).
7. React Native (n.d.) Alert. Available at: React Native – Alert⁠￼ (Accessed: 16 November 2026).
8. React Native (n.d.) StyleSheet. Available at: React Native – StyleSheet⁠￼ (Accessed: 16 November 2026).
9. React Native (n.d.) ScrollView. Available at: React Native – ScrollView⁠￼ (Accessed: 16 November 2026).
10. React Native (n.d.) TouchableOpacity. Available at: React Native – TouchableOpacity⁠￼ (Accessed: 16 November 2026).
11. React Native (n.d.) KeyboardAvoidingView. Available at: React Native – KeyboardAvoidingView⁠￼ (Accessed: 16 November 2026).
12. React Native (n.d.) SafeAreaView. Available at: React Native – SafeAreaView⁠￼ (Accessed: 16 November 2026).
13. React Native (n.d.) StatusBar. Available at: React Native – StatusBar⁠￼ (Accessed: 16 November 2026).

2. React and React Hooks

These references support the state management and calculations in your Part 2 and Part 3 applications.

14. React (n.d.) useState. Available at: React – useState⁠￼ (Accessed: 16 November 2026).
15. React (n.d.) useMemo. Available at: React – useMemo⁠￼ (Accessed: 16 November 2026).

3. JavaScript

These references cover the JavaScript methods used in your application.

16. MDN Web Docs (n.d.) Array.prototype.map(). Available at: MDN – Array map()⁠￼ (Accessed: 16 November 2026).
17. MDN Web Docs (n.d.) Array.prototype.filter(). Available at: MDN – Array filter()⁠￼ (Accessed: 16 November 2026).
18. MDN Web Docs (n.d.) Array.prototype.reduce(). Available at: MDN – Array reduce()⁠￼ (Accessed: 16 November 2026).
19. MDN Web Docs (n.d.) Date.now(). Available at: MDN – Date.now()⁠￼ (Accessed: 16 November 2026).
20. MDN Web Docs (n.d.) Math.random(). Available at: MDN – Math.random()⁠￼ (Accessed: 16 November 2026).
21. MDN Web Docs (n.d.) Number.isFinite(). Available at: MDN – Number.isFinite()⁠￼ (Accessed: 16 November 2026).
22. MDN Web Docs (n.d.) String.prototype.toLowerCase(). Available at: MDN – String toLowerCase()⁠￼ (Accessed: 16 November 2026).
23. MDN Web Docs (n.d.) String.prototype.replace(). Available at: MDN – String replace()⁠￼ (Accessed: 16 November 2026).

4. TypeScript

These references support your TypeScript types, data structures, functions and application logic.

24. Microsoft (n.d.) TypeScript Handbook: Everyday Types. Available at: TypeScript – Everyday Types⁠￼ (Accessed: 16 November 2026).
25. Microsoft (n.d.) TypeScript Documentation. Available at: TypeScript Documentation⁠￼ (Accessed: 16 November 2026).

5. Expo and Development Environment

These references support the development and execution of your React Native application.

26. Expo (n.d.) Create a project. Available at: Expo – Create a Project⁠￼ (Accessed: 16 November 2026).
27. Expo (n.d.) Set up your environment. Available at: Expo – Environment Setup⁠￼ (Accessed: 16 November 2026).
28. Expo (n.d.) Start developing. Available at: Expo – Start Developing⁠￼ (Accessed: 16 November 2026).

6. Git and GitHub

These references support version control, repository management and pushing your completed application.

29. Git (n.d.) Git documentation. Available at: Git Documentation⁠￼ (Accessed: 16 November 2026).
30. Git (n.d.) Git pull. Available at: Git Pull Documentation⁠￼ (Accessed: 16 November 2026).
31. Git (n.d.) Git push. Available at: Git Push Documentation⁠￼ (Accessed: 16 November 2026).
32. Abdool, S. (2026) Chef’s Menu Manager – MAST5112 Part 2. GitHub repository. Available at: Chef's Menu Manager GitHub Repository⁠￼ (Accessed: 16 November 2026).

7. Usability and User Interface Design

33. Nielsen, J. (2024) 10 usability heuristics for user interface design. Nielsen Norman Group. Available at: Nielsen Norman Group – Usability Heuristics⁠￼ (Accessed: 16 November 2026).
34. Anglia Ruskin University (n.d.) ARU Harvard. Available at: ARU Harvard Referencing Guide⁠￼ (Accessed: 16 November 2026).
