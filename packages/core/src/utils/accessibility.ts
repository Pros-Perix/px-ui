export const AccessibilityStatus = {
  COMPLIANT: 'compliant',
  PARTIAL: 'partial', 
  NON_COMPLIANT: 'non-compliant',
  UNKNOWN: 'unknown'
} as const;

export type AccessibilityStatusType = typeof AccessibilityStatus[keyof typeof AccessibilityStatus];

export interface WCAGCriteria {
  perceivable: boolean;
  operable: boolean;
  understandable: boolean;
  robust: boolean;
}

export interface AutomatedA11yReport {
  component: string;
  automated: {
    axeViolations: number;
    colorContrastPassing: boolean;
    ariaAttributesValid: boolean;
    keyboardAccessible: boolean;
    semanticHTML: boolean;
    focusManagement: boolean;
  };
  confidence: number; // 0-1 based on what's automated
  lastTested: string;
  requiresManualTesting: string[];
}

export interface SemiAutomatedCheck {
  detected: boolean;
  verified: boolean;
  notes?: string;
}

export interface ManualA11yChecklist {
  screenReaderTested: boolean;
  userJourneyValidated: boolean;
  contentReviewed: boolean;
  cognitiveLoadAssessed: boolean;
  signedOff?: string;
  date?: string;
}

export interface ComponentA11yStatus {
  component: string;
  wcag21_aa: AccessibilityStatusType;
  automated: {
    colorContrast: 'PASS' | 'FAIL' | 'UNKNOWN';
    ariaAttributes: 'PASS' | 'FAIL' | 'UNKNOWN';
    keyboardNav: 'PASS' | 'FAIL' | 'UNKNOWN';
    focusManagement: 'PASS' | 'FAIL' | 'UNKNOWN';
    semanticHTML: 'PASS' | 'FAIL' | 'UNKNOWN';
  };
  semiAutomated: {
    focusVisible: SemiAutomatedCheck;
    errorHandling: SemiAutomatedCheck;
    labelAssociation: SemiAutomatedCheck;
  };
  manual: ManualA11yChecklist;
  overallConfidence: number;
  criticalIssues: string[];
}

export const WCAG_CRITERIA_MAP = {
  '1.3.1': 'Info and Relationships',
  '1.4.3': 'Contrast (Minimum)',
  '1.4.11': 'Non-text Contrast',
  '2.1.1': 'Keyboard',
  '2.1.2': 'No Keyboard Trap',
  '2.4.3': 'Focus Order',
  '2.4.7': 'Focus Visible',
  '3.2.1': 'On Focus',
  '3.2.2': 'On Input',
  '3.3.1': 'Error Identification',
  '3.3.2': 'Labels or Instructions',
  '4.1.1': 'Parsing',
  '4.1.2': 'Name, Role, Value',
  '4.1.3': 'Status Messages'
} as const;

export const calculateOverallScore = (status: ComponentA11yStatus): number => {
  const automatedWeight = 0.7;
  const semiAutomatedWeight = 0.2;
  const manualWeight = 0.1;

  // Calculate automated score (0-1)
  const automatedTests = Object.values(status.automated);
  const automatedPass = automatedTests.filter(test => test === 'PASS').length;
  const automatedTotal = automatedTests.filter(test => test !== 'UNKNOWN').length;
  const automatedScore = automatedTotal > 0 ? automatedPass / automatedTotal : 0;

  // Calculate semi-automated score (0-1)
  const semiAutomatedTests = Object.values(status.semiAutomated);
  const semiAutomatedPass = semiAutomatedTests.filter(test => test.detected && test.verified).length;
  const semiAutomatedScore = semiAutomatedTests.length > 0 ? semiAutomatedPass / semiAutomatedTests.length : 0;

  // Calculate manual score (0-1)
  const manualChecks = [
    status.manual.screenReaderTested,
    status.manual.userJourneyValidated,
    status.manual.contentReviewed,
    status.manual.cognitiveLoadAssessed
  ];
  const manualPass = manualChecks.filter(Boolean).length;
  const manualScore = manualPass / manualChecks.length;

  return (
    automatedScore * automatedWeight +
    semiAutomatedScore * semiAutomatedWeight +
    manualScore * manualWeight
  );
};

export const getAccessibilityStatus = (score: number): AccessibilityStatusType => {
  if (score >= 0.9) return AccessibilityStatus.COMPLIANT;
  if (score >= 0.7) return AccessibilityStatus.PARTIAL;
  if (score > 0) return AccessibilityStatus.NON_COMPLIANT;
  return AccessibilityStatus.UNKNOWN;
};

export const generateAccessibilityBadge = (status: AccessibilityStatusType): string => {
  const badges = {
    [AccessibilityStatus.COMPLIANT]: '✅ WCAG 2.1 AA Compliant',
    [AccessibilityStatus.PARTIAL]: '⚠️ Partial WCAG 2.1 AA',
    [AccessibilityStatus.NON_COMPLIANT]: '❌ Non-Compliant',
    [AccessibilityStatus.UNKNOWN]: '🔍 Not Tested'
  };
  return badges[status];
};

