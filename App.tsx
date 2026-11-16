import React, { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Course = 'Starter' | 'Main Course' | 'Dessert';
type Screen = 'Home' | 'Menu' | 'Insights' | 'Profile';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const COURSES: Course[] = ['Starter', 'Main Course', 'Dessert'];

const STARTER_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Caprese Salad',
    description: 'Fresh tomatoes, creamy mozzarella, basil and a light balsamic dressing.',
    course: 'Starter',
    price: 125,
  },
  {
    id: 'dish-2',
    name: 'Herb-Crusted Fillet',
    description: 'Grilled beef fillet with a fragrant herb crust and seasonal vegetables.',
    course: 'Main Course',
    price: 295,
  },
  {
    id: 'dish-3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a soft centre, served with fresh berries.',
    course: 'Dessert',
    price: 145,
  },
  {
    id: 'dish-4',
    name: 'Roasted Pumpkin Soup',
    description: 'Slow-roasted pumpkin blended with cream, nutmeg and toasted seeds.',
    course: 'Starter',
    price: 95,
  },
  {
    id: 'dish-5',
    name: 'Lemon Butter Salmon',
    description: 'Pan-seared salmon with lemon butter sauce and baby potatoes.',
    course: 'Main Course',
    price: 265,
  },
];

const COLORS = {
  background: '#F4EBDD',
  paper: '#FBF6ED',
  card: '#EDE1CF',
  cardLight: '#F8F0E4',
  olive: '#343A22',
  olive2: '#51583A',
  ink: '#282719',
  muted: '#77715F',
  line: '#D9CBB7',
  gold: '#A58A61',
  danger: '#9C493E',
  white: '#FFFDF8',
};

const formatPrice = (value: number) => `R${value.toFixed(2)}`;

export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(STARTER_ITEMS);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Course | 'All'>('All');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState('');
  const [formError, setFormError] = useState('');

  const totalItems = menuItems.length;
  const averagePrice = totalItems
    ? menuItems.reduce((sum, item) => sum + item.price, 0) / totalItems
    : 0;

  const courseCounts = useMemo(
    () => ({
      Starter: menuItems.filter((item) => item.course === 'Starter').length,
      'Main Course': menuItems.filter((item) => item.course === 'Main Course').length,
      Dessert: menuItems.filter((item) => item.course === 'Dessert').length,
    }),
    [menuItems],
  );

  const filteredItems = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesCourse =
        selectedFilter === 'All' || item.course === selectedFilter;
      return matchesName && matchesCourse;
    });
  }, [menuItems, searchText, selectedFilter]);

  const resetForm = () => {
    setEditingId(null);
    setDishName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setFormError('');
  };

  const openAddForm = () => {
    resetForm();
    setScreen('Menu');
    // The form is displayed at the top of the menu screen.
  };

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setDishName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(String(item.price));
    setFormError('');
    setScreen('Menu');
  };

  const saveDish = () => {
    Keyboard.dismiss();

    const cleanName = dishName.trim();
    const cleanDescription = description.trim();
    const cleanPrice = price.trim().replace(',', '.');
    const numericPrice = Number(cleanPrice);

    if (!cleanName) {
      setFormError('Please enter a dish name.');
      return;
    }
    if (!cleanDescription) {
      setFormError('Please enter a description.');
      return;
    }
    if (!COURSES.includes(course)) {
      setFormError('Please select a valid course.');
      return;
    }
    if (!cleanPrice || !Number.isFinite(numericPrice) || numericPrice <= 0) {
      setFormError('Enter a valid price greater than R0.00.');
      return;
    }

    if (editingId) {
      setMenuItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: cleanName,
                description: cleanDescription,
                course,
                price: numericPrice,
              }
            : item,
        ),
      );
      Alert.alert('Changes saved', `${cleanName} has been updated.`);
    } else {
      const newItem: MenuItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: cleanName,
        description: cleanDescription,
        course,
        price: numericPrice,
      };
      setMenuItems((current) => [newItem, ...current]);
      Alert.alert('Dish added', `${cleanName} has been added to your menu.`);
    }

    resetForm();
  };

  const deleteDish = (item: MenuItem) => {
    Alert.alert(
      'Delete menu item?',
      `Are you sure you want to delete "${item.name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems((current) => current.filter((dish) => dish.id !== item.id));
            if (editingId === item.id) resetForm();
          },
        },
      ],
    );
  };

  const renderHeader = (eyebrow?: string) => (
    <View style={styles.brandHeader}>
      <Text style={styles.brandMark}>♧</Text>
      <Text style={styles.brandTitle}>CHEF’S MENU</Text>
      <Text style={styles.brandSubTitle}>M A N A G E R</Text>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <View style={styles.headerRule}>
        <View style={styles.ruleLine} />
        <Text style={styles.ruleIcon}>♨</Text>
        <View style={styles.ruleLine} />
      </View>
    </View>
  );

  const renderStatCard = (label: string, value: string, symbol: string) => (
    <View style={styles.statCard}>
      <Text style={styles.statSymbol}>{symbol}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const renderDishCard = (item: MenuItem) => (
    <View key={item.id} style={styles.dishCard}>
      <View style={styles.dishImage}>
        <Text style={styles.dishImageSymbol}>
          {item.course === 'Starter' ? '❋' : item.course === 'Dessert' ? '✿' : '♨'}
        </Text>
      </View>
      <View style={styles.dishDetails}>
        <Text style={styles.dishName}>{item.name}</Text>
        <Text style={styles.dishCourse}>{item.course}</Text>
        <Text style={styles.dishPrice}>{formatPrice(item.price)}</Text>
      </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity
          onPress={() => startEditing(item)}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${item.name}`}
        >
          <Text style={styles.actionIcon}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteDish(item)}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
        >
          <Text style={styles.actionIcon}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      {renderHeader('A THOUGHTFUL MENU STARTS HERE')}
      <Text style={styles.greeting}>Good day, Chef.</Text>
      <Text style={styles.introText}>
        Create, refine and keep track of every dish on your restaurant menu.
      </Text>

      <View style={styles.heroPanel}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroEyebrow}>YOUR MENU AT A GLANCE</Text>
          <Text style={styles.heroNumber}>{totalItems}</Text>
          <Text style={styles.heroLabel}>TOTAL MENU ITEMS</Text>
          <View style={styles.heroDivider} />
          <Text style={styles.heroLabel}>AVERAGE MENU PRICE</Text>
          <Text style={styles.heroPrice}>{formatPrice(averagePrice)}</Text>
        </View>
        <Text style={styles.heroDecoration}>❧</Text>
      </View>

      <Text style={styles.sectionTitle}>YOUR KITCHEN</Text>
      <Text style={styles.sectionCaption}>Choose where you would like to begin.</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickCard} onPress={openAddForm}>
          <Text style={styles.quickIcon}>＋</Text>
          <Text style={styles.quickTitle}>ADD ITEM</Text>
          <Text style={styles.quickCaption}>Create a dish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => setScreen('Menu')}>
          <Text style={styles.quickIcon}>♧</Text>
          <Text style={styles.quickTitle}>MANAGE MENU</Text>
          <Text style={styles.quickCaption}>Edit your dishes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard} onPress={() => setScreen('Insights')}>
          <Text style={styles.quickIcon}>▥</Text>
          <Text style={styles.quickTitle}>INSIGHTS</Text>
          <Text style={styles.quickCaption}>View statistics</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notePanel}>
        <Text style={styles.noteTitle}>A NOTE FROM THE KITCHEN</Text>
        <Text style={styles.noteText}>
          Keep your menu balanced by reviewing the number of starters, main courses and desserts.
        </Text>
      </View>
    </ScrollView>
  );

  const renderForm = () => (
    <View style={styles.formPanel}>
      <Text style={styles.sectionTitle}>{editingId ? 'EDIT MENU ITEM' : 'ADD A MENU ITEM'}</Text>
      <Text style={styles.sectionCaption}>
        {editingId ? 'Update the details of this dish.' : 'Enter the details of your new creation.'}
      </Text>

      <Text style={styles.inputLabel}>DISH NAME *</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="e.g. Herb-Crusted Fillet"
        placeholderTextColor={COLORS.muted}
        maxLength={80}
        returnKeyType="next"
      />

      <Text style={styles.inputLabel}>COURSE *</Text>
      <View style={styles.courseChoices}>
        {COURSES.map((option) => {
          const selected = course === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => setCourse(option)}
              style={[styles.courseChip, selected && styles.courseChipSelected]}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text style={[styles.courseChipText, selected && styles.courseChipTextSelected]}>
                {option === 'Main Course' ? 'MAIN' : option.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.inputLabel}>DESCRIPTION *</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the ingredients and flavours..."
        placeholderTextColor={COLORS.muted}
        multiline
        textAlignVertical="top"
        maxLength={300}
      />

      <Text style={styles.inputLabel}>PRICE (ZAR) *</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={(value) => setPrice(value.replace(',', '.'))}
        placeholder="e.g. 195.00"
        placeholderTextColor={COLORS.muted}
        keyboardType="decimal-pad"
        maxLength={10}
      />

      {formError ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{formError}</Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.primaryButton} onPress={saveDish}>
        <Text style={styles.primaryButtonText}>
          {editingId ? 'SAVE CHANGES' : 'ADD TO MENU'}
        </Text>
      </TouchableOpacity>
      {editingId ? (
        <TouchableOpacity style={styles.secondaryButton} onPress={resetForm}>
          <Text style={styles.secondaryButtonText}>CANCEL EDITING</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.requiredText}>* REQUIRED FIELDS</Text>
      )}
    </View>
  );

  const renderMenu = () => (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      {renderHeader('THE COLLECTION')}
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.pageTitle}>Menu</Text>
          <Text style={styles.sectionCaption}>Browse, search and refine your dishes.</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countNumber}>{totalItems}</Text>
        </View>
      </View>

      {renderForm()}

      <Text style={[styles.sectionTitle, { marginTop: 26 }]}>YOUR DISHES</Text>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search menu item by name..."
          placeholderTextColor={COLORS.muted}
          returnKeyType="search"
        />
        {searchText.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.filterRow}>
        {(['All', ...COURSES] as const).map((filter) => {
          const selected = selectedFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, selected && styles.filterChipSelected]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selected && styles.filterTextSelected]}>
                {filter === 'Main Course' ? 'MAIN' : filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.clearFilters}
        onPress={() => {
          setSearchText('');
          setSelectedFilter('All');
        }}
      >
        <Text style={styles.clearFiltersText}>×  CLEAR SEARCH & FILTERS</Text>
      </TouchableOpacity>

      {filteredItems.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptySymbol}>❧</Text>
          <Text style={styles.emptyTitle}>No dishes found</Text>
          <Text style={styles.emptyText}>
            Try another search or clear the filters to view all menu items.
          </Text>
        </View>
      ) : (
        filteredItems.map(renderDishCard)
      )}
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      {renderHeader('A CLEAR VIEW OF YOUR MENU')}
      <Text style={styles.pageTitle}>Menu Insights</Text>
      <Text style={styles.sectionCaption}>A quick overview of your restaurant menu.</Text>

      <View style={styles.statsGrid}>
        {renderStatCard('TOTAL MENU ITEMS', String(totalItems), '♧')}
        {renderStatCard('AVERAGE MENU PRICE', formatPrice(averagePrice), '◎')}
      </View>

      <View style={styles.courseStatsCard}>
        <Text style={styles.courseStatsTitle}>ITEMS BY COURSE</Text>
        {COURSES.map((item) => {
          const count = courseCounts[item];
          const percentage = totalItems ? (count / totalItems) * 100 : 0;
          return (
            <View key={item} style={styles.courseStatRow}>
              <View style={styles.courseStatHeading}>
                <Text style={styles.courseStatName}>{item}</Text>
                <Text style={styles.courseStatCount}>{count}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${percentage}%` }]} />
              </View>
              <Text style={styles.coursePercent}>{percentage.toFixed(0)}% of menu</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.summaryPanel}>
        <Text style={styles.summaryIcon}>▥</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.summaryTitle}>MENU OVERVIEW</Text>
          <Text style={styles.summaryText}>
            {totalItems === 0
              ? 'Add dishes to begin viewing your menu statistics.'
              : `Your menu contains ${totalItems} ${totalItems === 1 ? 'dish' : 'dishes'}, with an average price of ${formatPrice(averagePrice)}.`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
      {renderHeader('ABOUT THIS APPLICATION')}
      <Text style={styles.pageTitle}>The Chef</Text>
      <Text style={styles.sectionCaption}>A simple space to organise a considered menu.</Text>
      <View style={styles.notePanel}>
        <Text style={styles.noteTitle}>CHEF’S MENU MANAGER</Text>
        <Text style={styles.noteText}>
          This application helps a chef add, view, edit, delete, search and filter menu items,
          while displaying useful menu statistics.
        </Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileLabel}>MODULE</Text>
        <Text style={styles.profileValue}>MAST5112 · Mobile App Scripting</Text>
        <Text style={styles.profileLabel}>APPLICATION</Text>
        <Text style={styles.profileValue}>Chef’s Menu Manager</Text>
        <Text style={styles.profileLabel}>VERSION</Text>
        <Text style={styles.profileValue}>Part 3 · Enhanced Edition</Text>
      </View>
    </ScrollView>
  );

  const renderCurrentScreen = () => {
    switch (screen) {
      case 'Menu':
        return renderMenu();
      case 'Insights':
        return renderInsights();
      case 'Profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView
        style={styles.appContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>{renderCurrentScreen()}</View>
        <View style={styles.bottomNav}>
          {(['Home', 'Menu', 'Insights', 'Profile'] as Screen[]).map((item) => {
            const active = screen === item;
            const icon = item === 'Home' ? '⌂' : item === 'Menu' ? '♧' : item === 'Insights' ? '▥' : '♙';
            return (
              <TouchableOpacity
                key={item}
                style={styles.navItem}
                onPress={() => {
                  Keyboard.dismiss();
                  setScreen(item);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  appContainer: { flex: 1 },
  content: { flex: 1 },
  page: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 28 },
  brandHeader: { alignItems: 'center', paddingTop: 5, paddingBottom: 15 },
  brandMark: { color: COLORS.olive2, fontSize: 26, marginBottom: 2 },
  brandTitle: { color: COLORS.ink, fontSize: 25, letterSpacing: 1.1, fontWeight: '400' },
  brandSubTitle: { color: COLORS.ink, fontSize: 9, marginTop: 2, letterSpacing: 3 },
  eyebrow: { color: COLORS.gold, fontSize: 9, letterSpacing: 1.8, marginTop: 13 },
  headerRule: { flexDirection: 'row', alignItems: 'center', width: '65%', marginTop: 14 },
  ruleLine: { flex: 1, height: 1, backgroundColor: COLORS.gold },
  ruleIcon: { color: COLORS.olive, fontSize: 17, marginHorizontal: 12 },
  greeting: { color: COLORS.ink, fontSize: 27, marginTop: 4, fontWeight: '400' },
  introText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, marginTop: 5, marginBottom: 18 },
  heroPanel: {
    minHeight: 205, backgroundColor: COLORS.olive, borderRadius: 20,
    padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 25,
    overflow: 'hidden',
  },
  heroCopy: { flex: 1 },
  heroEyebrow: { color: '#D7C9AE', fontSize: 9, letterSpacing: 1.5 },
  heroNumber: { color: COLORS.paper, fontSize: 48, marginTop: 5, fontWeight: '300' },
  heroLabel: { color: '#E7DDCB', fontSize: 10, letterSpacing: 1, marginTop: 2 },
  heroDivider: { width: '80%', height: 1, backgroundColor: '#9B987B', marginVertical: 12 },
  heroPrice: { color: COLORS.paper, fontSize: 25, marginTop: 3 },
  heroDecoration: { color: '#9CA083', fontSize: 92, transform: [{ rotate: '-20deg' }], marginRight: -10 },
  sectionTitle: { color: COLORS.ink, fontSize: 17, letterSpacing: 1.1, fontWeight: '500' },
  sectionCaption: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 4, marginBottom: 13 },
  quickActions: { flexDirection: 'row', gap: 9, marginTop: 5 },
  quickCard: {
    flex: 1, minHeight: 115, backgroundColor: COLORS.card, borderRadius: 15,
    paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', justifyContent: 'center',
  },
  quickIcon: { color: COLORS.olive, fontSize: 26, marginBottom: 7 },
  quickTitle: { color: COLORS.ink, fontSize: 9, letterSpacing: 0.6, fontWeight: '700' },
  quickCaption: { color: COLORS.muted, fontSize: 9, marginTop: 4, textAlign: 'center' },
  notePanel: { backgroundColor: COLORS.card, borderRadius: 16, padding: 18, marginTop: 22 },
  noteTitle: { color: COLORS.olive, fontSize: 10, letterSpacing: 1.3, fontWeight: '700' },
  noteText: { color: COLORS.ink, fontSize: 12, lineHeight: 19, marginTop: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  pageTitle: { color: COLORS.ink, fontSize: 30, marginTop: 2, fontWeight: '400' },
  countBadge: {
    width: 43, height: 43, borderRadius: 22, backgroundColor: COLORS.olive,
    alignItems: 'center', justifyContent: 'center',
  },
  countNumber: { color: COLORS.paper, fontSize: 16, fontWeight: '600' },
  formPanel: { backgroundColor: COLORS.cardLight, borderRadius: 17, padding: 16, marginTop: 5, borderWidth: 1, borderColor: COLORS.line },
  inputLabel: { color: COLORS.ink, fontSize: 10, letterSpacing: 1, fontWeight: '700', marginTop: 14, marginBottom: 7 },
  input: {
    backgroundColor: '#FBF7EF', borderWidth: 1, borderColor: COLORS.line,
    borderRadius: 9, paddingHorizontal: 12, paddingVertical: 11, color: COLORS.ink, fontSize: 13,
  },
  descriptionInput: { height: 82, paddingTop: 11 },
  courseChoices: { flexDirection: 'row', gap: 6 },
  courseChip: { flex: 1, borderWidth: 1, borderColor: COLORS.line, borderRadius: 20, paddingVertical: 10, alignItems: 'center' },
  courseChipSelected: { backgroundColor: COLORS.olive, borderColor: COLORS.olive },
  courseChipText: { color: COLORS.ink, fontSize: 9, letterSpacing: 0.4, fontWeight: '600' },
  courseChipTextSelected: { color: COLORS.paper },
  primaryButton: { backgroundColor: COLORS.olive, borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 18 },
  primaryButtonText: { color: COLORS.paper, fontSize: 11, letterSpacing: 1.2, fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderColor: COLORS.olive, borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 9 },
  secondaryButtonText: { color: COLORS.olive, fontSize: 10, letterSpacing: 1, fontWeight: '700' },
  requiredText: { color: COLORS.muted, textAlign: 'center', fontSize: 9, marginTop: 10, letterSpacing: 0.5 },
  errorBox: { backgroundColor: '#F8E7E1', borderWidth: 1, borderColor: '#D9A69B', borderRadius: 9, padding: 10, marginTop: 12 },
  errorText: { color: COLORS.danger, fontSize: 12 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardLight, borderWidth: 1, borderColor: COLORS.line, borderRadius: 24, paddingHorizontal: 13, marginTop: 7 },
  searchIcon: { color: COLORS.ink, fontSize: 23, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 11, color: COLORS.ink, fontSize: 12 },
  clearText: { color: COLORS.olive, fontSize: 23, paddingHorizontal: 5 },
  filterRow: { flexDirection: 'row', gap: 6, marginTop: 13 },
  filterChip: { flex: 1, borderWidth: 1, borderColor: COLORS.line, borderRadius: 18, paddingVertical: 9, alignItems: 'center' },
  filterChipSelected: { backgroundColor: COLORS.olive, borderColor: COLORS.olive },
  filterText: { color: COLORS.ink, fontSize: 8, letterSpacing: 0.3, fontWeight: '600' },
  filterTextSelected: { color: COLORS.paper },
  clearFilters: { alignSelf: 'flex-end', paddingVertical: 12 },
  clearFiltersText: { color: COLORS.olive, fontSize: 9, letterSpacing: 0.7, fontWeight: '600' },
  dishCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardLight, borderRadius: 13, borderWidth: 1, borderColor: COLORS.line, padding: 9, marginBottom: 9 },
  dishImage: { width: 68, height: 68, borderRadius: 10, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center' },
  dishImageSymbol: { color: COLORS.olive2, fontSize: 32 },
  dishDetails: { flex: 1, paddingHorizontal: 11 },
  dishName: { color: COLORS.ink, fontSize: 13, fontWeight: '600' },
  dishCourse: { color: COLORS.muted, fontSize: 10, marginTop: 4 },
  dishPrice: { color: COLORS.olive, fontSize: 12, marginTop: 5, fontWeight: '700' },
  actionColumn: { alignItems: 'center', justifyContent: 'center', gap: 5 },
  iconButton: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
  actionIcon: { color: COLORS.ink, fontSize: 20 },
  emptyCard: { backgroundColor: COLORS.cardLight, borderRadius: 15, borderWidth: 1, borderColor: COLORS.line, padding: 23, alignItems: 'center', marginTop: 8 },
  emptySymbol: { color: COLORS.olive, fontSize: 36 },
  emptyTitle: { color: COLORS.ink, fontSize: 16, marginTop: 8 },
  emptyText: { color: COLORS.muted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginTop: 6 },
  statsGrid: { flexDirection: 'row', gap: 10, marginTop: 17 },
  statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 15, padding: 15, minHeight: 125, justifyContent: 'center' },
  statSymbol: { color: COLORS.olive, fontSize: 23 },
  statLabel: { color: COLORS.ink, fontSize: 9, letterSpacing: 0.6, marginTop: 6 },
  statValue: { color: COLORS.olive, fontSize: 23, marginTop: 7 },
  courseStatsCard: { backgroundColor: COLORS.cardLight, borderRadius: 16, borderWidth: 1, borderColor: COLORS.line, padding: 17, marginTop: 17 },
  courseStatsTitle: { color: COLORS.ink, fontSize: 14, marginBottom: 13 },
  courseStatRow: { marginBottom: 14 },
  courseStatHeading: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  courseStatName: { color: COLORS.ink, fontSize: 12 },
  courseStatCount: { color: COLORS.olive, fontSize: 13, fontWeight: '700' },
  barTrack: { height: 7, backgroundColor: COLORS.card, borderRadius: 8, overflow: 'hidden' },
  barFill: { height: 7, backgroundColor: COLORS.olive2, borderRadius: 8 },
  coursePercent: { color: COLORS.muted, fontSize: 9, marginTop: 4 },
  summaryPanel: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: COLORS.card, borderRadius: 15, padding: 16, marginTop: 18 },
  summaryIcon: { color: COLORS.olive, fontSize: 30 },
  summaryTitle: { color: COLORS.ink, fontSize: 11, letterSpacing: 0.7, fontWeight: '700' },
  summaryText: { color: COLORS.muted, fontSize: 11, lineHeight: 17, marginTop: 5 },
  profileInfo: { backgroundColor: COLORS.cardLight, borderWidth: 1, borderColor: COLORS.line, borderRadius: 15, padding: 18, marginTop: 17 },
  profileLabel: { color: COLORS.gold, fontSize: 9, letterSpacing: 1.1, marginTop: 9 },
  profileValue: { color: COLORS.ink, fontSize: 13, marginTop: 4 },
  bottomNav: { flexDirection: 'row', backgroundColor: COLORS.olive, paddingTop: 10, paddingBottom: Platform.OS === 'ios' ? 5 : 11, justifyContent: 'space-around' },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIcon: { color: '#C9C4B1', fontSize: 21 },
  navIconActive: { color: '#FFF8E9' },
  navLabel: { color: '#C9C4B1', fontSize: 8, letterSpacing: 0.7, marginTop: 3 },
  navLabelActive: { color: '#FFF8E9', fontWeight: '700' },
});
