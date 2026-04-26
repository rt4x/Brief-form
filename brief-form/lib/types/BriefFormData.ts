export type BriefFormData = {
  id: string;
  createdAt: string;

  // contact
  name: string;
  email: string;

  // product
  appName: string;
  projectDescription: string;

  // business
  problemStatement: string;
  businessGoals: string;
  targetAudience: string;

  // features
  featureCaloriesTracking?: boolean;
  featureBarcodeScanner?: boolean;
  featureWaterTracking?: boolean;
  featureAIRecommendations?: boolean;
  featureMealPlanner?: boolean;
  featureGroceryList?: boolean;

  featuresAdditionalInfo?: string;

  // platforms
  ios?: boolean;
  android?: boolean;
  web?: boolean;
  ipadOs?: boolean;
  watchOs?: boolean;
  platformOther?: string;

  // constraints
  constraints?: string;
  assumptions?: string;
  successCriteria?: string;

  // monetization
  hasSubscriptions?: boolean;
  hasAds?: boolean;
  hasInAppPurchases?: boolean;
  monetizationNotes?: string;

  integrations?: string;

  additionalInfo?: string;
};
