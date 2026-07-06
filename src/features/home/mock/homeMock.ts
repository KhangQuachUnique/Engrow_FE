export const homeLearningTasks = [
  { label: "Write one essay", state: "done" },
  { label: "Review 15 flashcards", state: "done" },
  { label: "Fix 5 grammar mistakes", state: "pending" },
] as const;

export const homeFeedbackHighlights = [
  "Use clearer topic sentences in paragraph 2.",
  "Vary sentence openings to avoid repetition.",
  "Add one stronger example for your main argument.",
] as const;

export const homeUnfinishedDrafts = [
  {
    effort: "23 min left",
    state: "in-progress",
    title: "Task 2: Online learning and classroom learning",
    status: "In progress",
    summary: "You stopped after the outline and the first body paragraph.",
  },
  {
    effort: "12 min left",
    state: "almost",
    title: "Task 1: Student study habits chart",
    status: "Almost finished",
    summary: "The introduction is done. Add the comparison paragraph and a short conclusion.",
  },
] as const;

export const homePendingFeedback = [
  {
    band: "7.0",
    severity: "attention",
    note: "Topic sentences need to be clearer in two paragraphs.",
    title: "Task 2 draft from yesterday",
  },
  {
    band: "7.5",
    severity: "review",
    note: "Good ideas, but some sentences still feel repetitive.",
    title: "Recent vocabulary practice",
  },
  {
    band: "6.5",
    severity: "priority",
    note: "A stronger example would make the argument feel more complete.",
    title: "Weekend opinion essay",
  },
] as const;

export const homeWritingTopics = [
  {
    label: "Education",
    imageAlt: "Open notebook on a desk for an education writing topic",
    imageUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80",
    title: "Should students learn more practical skills at school?",
    hint: "Task 2 - opinion essay",
  },
  {
    label: "Technology",
    imageAlt: "Laptop screen with code and technology workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    title: "Has social media made communication better or worse?",
    hint: "Task 2 - discussion essay",
  },
  {
    label: "Environment",
    imageAlt: "Green forest path for an environment writing topic",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    title: "What should cities do to reduce traffic and pollution?",
    hint: "Task 2 - problem/solution",
  },
  {
    label: "Health",
    imageAlt: "Healthy food bowl for a health writing topic",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    title: "How can people build better daily study habits?",
    hint: "Task 2 - process writing",
  },
  {
    label: "Work",
    imageAlt: "Modern office desk for a work writing topic",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    title: "Why do some people prefer remote work?",
    hint: "Task 2 - causes/advantages",
  },
  {
    label: "Daily life",
    imageAlt: "Notebook and coffee for a daily life writing topic",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
    title: "Describe a routine that helps you stay focused.",
    hint: "Free writing prompt",
  },
] as const;

export const homeDiscoverCards = [
  {
    badge: "New",
    description: "Timed prompts that feel like the real exam, but still manageable.",
    title: "Task 2 starter pack",
  },
  {
    badge: "Popular",
    description: "Charts, maps, and process diagrams with guided structure hints.",
    title: "Task 1 visual practice",
  },
  {
    badge: "Build",
    description: "Topic bundles designed to improve range without sounding forced.",
    title: "Vocabulary discovery",
  },
] as const;

export const homePracticeStats = [
  {
    label: "Essays this week",
    value: "12",
    note: "+3 from last week",
  },
  {
    label: "Average band",
    value: "7.2",
    note: "Targeting 7.5 next",
  },
  {
    label: "Active streak",
    value: "36 days",
    note: "Keep the rhythm going",
  },
] as const;
