import React, { useState } from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const COURSES: Course[] = [
  'Starter',
  'Main Course',
  'Dessert',
];

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course | ''>('');
  const [price, setPrice] = useState('');

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddDish = () => {
    Keyboard.dismiss();

    const trimmedName = dishName.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();

    if (!trimmedName) {
      setErrorMessage('Please enter the dish name.');
      return;
    }

    if (!trimmedDescription) {
      setErrorMessage('Please enter a description.');
      return;
    }

    if (!course) {
      setErrorMessage('Please select a course.');
      return;
    }

    if (!trimmedPrice) {
      setErrorMessage('Please enter the dish price.');
      return;
    }

    const numericPrice = Number(trimmedPrice);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setErrorMessage('Please enter a valid price greater than zero.');
      return;
    }

    const newDish: MenuItem = {
      id: `${Date.now()}-${Math.random()}`,
      name: trimmedName,
      description: trimmedDescription,
      course,
      price: numericPrice,
    };

    setMenuItems((previousItems) => [
      ...previousItems,
      newDish,
    ]);

    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrorMessage('');

    Alert.alert(
      'Dish Added Successfully',
      `${trimmedName} has been added to your menu.`,
      [{ text: 'Continue' }],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.screen}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.eyebrow}>
              RESTAURANT MANAGEMENT
            </Text>

            <Text style={styles.appTitle}>
              Chef's Menu Manager
            </Text>

            <Text style={styles.subtitle}>
              A thoughtful menu starts with every dish.
            </Text>
          </View>

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeLabel}>
              YOUR KITCHEN, YOUR CREATIONS
            </Text>

            <Text style={styles.welcomeTitle}>
              Make every dish count.
            </Text>

            <Text style={styles.welcomeDescription}>
              Add your signature dishes and build your restaurant menu
              in one simple place.
            </Text>

            <Text style={styles.welcomeEmoji}>🍽️</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Add a Menu Item
            </Text>

            <Text style={styles.sectionSubtitle}>
              Enter the details of your new dish below.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.inputLabel}>
              Dish Name *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. Creamy Mushroom Risotto"
              placeholderTextColor="#A49B90"
              value={dishName}
              onChangeText={setDishName}
              maxLength={80}
              returnKeyType="next"
            />

            <Text style={styles.inputLabel}>
              Description *
            </Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Describe the ingredients and flavours..."
              placeholderTextColor="#A49B90"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
              maxLength={300}
            />

            <Text style={styles.inputLabel}>
              Course *
            </Text>

            <Text style={styles.helperText}>
              Choose the category for your dish.
            </Text>

            <View style={styles.courseContainer}>
              {COURSES.map((item) => {
                const selected = course === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.courseButton,
                      selected && styles.selectedCourseButton,
                    ]}
                    onPress={() => setCourse(item)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text
                      style={[
                        styles.courseButtonText,
                        selected && styles.selectedCourseText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.inputLabel}>
              Price (R) *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="e.g. 125.00"
              placeholderTextColor="#A49B90"
              value={price}
              onChangeText={(value) => {
                setPrice(value.replace(',', '.'));
              }}
              keyboardType="decimal-pad"
              maxLength={10}
            />

            <Text style={styles.helperText}>
              Enter the price in South African rand.
            </Text>

            {errorMessage !== '' && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddDish}
              accessibilityRole="button"
            >
              <Text style={styles.addButtonText}>
                +  Add Dish to Menu
              </Text>
            </TouchableOpacity>

            <Text style={styles.requiredNote}>
              * Required fields
            </Text>
          </View>

          <View style={styles.menuHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Your Menu
              </Text>

              <Text style={styles.sectionSubtitle}>
                All your added dishes in one place.
              </Text>
            </View>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>
                {menuItems.length}
              </Text>
            </View>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>🥗</Text>

              <Text style={styles.emptyTitle}>
                Your menu is waiting.
              </Text>

              <Text style={styles.emptyDescription}>
                You haven't added any dishes yet. Your creations
                will appear here once you add your first dish.
              </Text>
            </View>
          ) : (
            <View style={styles.menuList}>
              {menuItems.map((item) => (
                <View key={item.id} style={styles.dishCard}>
                  <View style={styles.dishTopRow}>
                    <View style={styles.dishNameContainer}>
                      <Text style={styles.dishName}>
                        {item.name}
                      </Text>

                      <View style={styles.courseBadge}>
                        <Text style={styles.courseBadgeText}>
                          {item.course}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.dishPrice}>
                      R {item.price.toFixed(2)}
                    </Text>
                  </View>

                  <Text style={styles.dishDescription}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.footer}>
            MADE WITH CARE · CHEF'S MENU MANAGER
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },

  keyboardContainer: {
    flex: 1,
  },

  screen: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },

  eyebrow: {
    color: '#967451',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },

  appTitle: {
    color: '#293D32',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 10,
  },

  subtitle: {
    color: '#777168',
    fontSize: 13,
    marginTop: 7,
    lineHeight: 19,
  },

  welcomeCard: {
    backgroundColor: '#304A3A',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },

  welcomeLabel: {
    color: '#D5C5A8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    marginTop: 13,
  },

  welcomeDescription: {
    color: '#E0E6DC',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 21,
  },

  welcomeEmoji: {
    fontSize: 34,
    marginTop: 15,
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    color: '#293D32',
    fontSize: 21,
    fontWeight: '800',
  },

  sectionSubtitle: {
    color: '#837A70',
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E9E0D6',
    marginBottom: 30,
  },

  inputLabel: {
    color: '#293D32',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 9,
    marginTop: 14,
  },

  input: {
    backgroundColor: '#FBF9F6',
    borderWidth: 1,
    borderColor: '#E7DED2',
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 13,
    color: '#293D32',
    fontSize: 13,
  },

  descriptionInput: {
    height: 100,
    paddingTop: 13,
  },

  helperText: {
    color: '#91877B',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
    marginBottom: 4,
  },

  courseContainer: {
    marginTop: 8,
  },

  courseButton: {
    borderWidth: 1,
    borderColor: '#E7DED2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 13,
    marginBottom: 8,
    backgroundColor: '#FBF9F6',
  },

  selectedCourseButton: {
    backgroundColor: '#304A3A',
    borderColor: '#304A3A',
  },

  courseButtonText: {
    color: '#514B43',
    fontSize: 13,
    fontWeight: '600',
  },

  selectedCourseText: {
    color: '#FFFFFF',
  },

  errorBox: {
    backgroundColor: '#FFF0EE',
    borderColor: '#E9B6AF',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },

  errorText: {
    color: '#A43F35',
    fontSize: 12,
    lineHeight: 18,
  },

  addButton: {
    backgroundColor: '#304A3A',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  requiredNote: {
    color: '#91877B',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 12,
  },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  countBadge: {
    backgroundColor: '#E8E2D8',
    borderRadius: 20,
    minWidth: 36,
    height: 36,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    color: '#304A3A',
    fontSize: 14,
    fontWeight: '800',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E0D6',
    borderStyle: 'dashed',
  },

  emptyEmoji: {
    fontSize: 35,
    marginBottom: 12,
  },

  emptyTitle: {
    color: '#293D32',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },

  emptyDescription: {
    color: '#837A70',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 9,
  },

  menuList: {
    gap: 12,
  },

  dishCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 17,
    borderWidth: 1,
    borderColor: '#E9E0D6',
  },

  dishTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  dishNameContainer: {
    flex: 1,
    paddingRight: 10,
  },

  dishName: {
    color: '#293D32',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },

  courseBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8EDE5',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    marginTop: 8,
  },

  courseBadgeText: {
    color: '#304A3A',
    fontSize: 10,
    fontWeight: '700',
  },

  dishPrice: {
    color: '#967451',
    fontSize: 14,
    fontWeight: '800',
  },

  dishDescription: {
    color: '#777168',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 13,
  },

  footer: {
    color: '#968B7F',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 32,
    letterSpacing: 1,
  },
});