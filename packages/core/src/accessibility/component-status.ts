import type { ComponentA11yStatus } from '../utils/accessibility';
import { AccessibilityStatus } from '../utils/accessibility';

export const COMPONENT_A11Y_STATUS: Record<string, ComponentA11yStatus> = {
  'Button': {
    component: 'Button',
    wcag21_aa: AccessibilityStatus.PARTIAL,
    automated: {
      colorContrast: 'UNKNOWN', // Needs color token verification
      ariaAttributes: 'PARTIAL', // Missing aria-label support for icon buttons
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: false, verified: false, notes: 'Uses outline-none without visible alternative' },
      errorHandling: { detected: false, verified: false, notes: 'Not applicable for button' },
      labelAssociation: { detected: true, verified: true, notes: 'Uses button text content' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: true,
      cognitiveLoadAssessed: true
    },
    overallConfidence: 0.6,
    criticalIssues: [
      'Missing visible focus indicators',
      'No aria-label support for icon-only buttons',
      'Color contrast not verified'
    ]
  },
  
  'TextInput': {
    component: 'TextInput',
    wcag21_aa: AccessibilityStatus.NON_COMPLIANT,
    automated: {
      colorContrast: 'UNKNOWN',
      ariaAttributes: 'FAIL', // Missing aria-labelledby, aria-describedby
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: true, verified: true, notes: 'Has focus-visible styles' },
      errorHandling: { detected: false, verified: false, notes: 'No aria-describedby for errors' },
      labelAssociation: { detected: false, verified: false, notes: 'No built-in label association' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: false,
      cognitiveLoadAssessed: false
    },
    overallConfidence: 0.4,
    criticalIssues: [
      'No label association mechanism',
      'Missing error message association',
      'No aria-describedby support'
    ]
  },

  'Checkbox': {
    component: 'Checkbox',
    wcag21_aa: AccessibilityStatus.PARTIAL,
    automated: {
      colorContrast: 'UNKNOWN',
      ariaAttributes: 'PARTIAL', // Has aria-invalid but missing label association
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: true, verified: false, notes: 'Has focus-visible:ring-2 but contrast needs verification' },
      errorHandling: { detected: true, verified: false, notes: 'Has aria-invalid but no error description' },
      labelAssociation: { detected: false, verified: false, notes: 'No built-in label support' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: false,
      cognitiveLoadAssessed: false
    },
    overallConfidence: 0.5,
    criticalIssues: [
      'Missing label association',
      'No aria-describedby for errors',
      'Focus ring contrast needs verification'
    ]
  },

  'Select': {
    component: 'Select',
    wcag21_aa: AccessibilityStatus.PARTIAL,
    automated: {
      colorContrast: 'UNKNOWN',
      ariaAttributes: 'PARTIAL', // Has some ARIA but missing label association
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: true, verified: false, notes: 'Inherited from Base UI' },
      errorHandling: { detected: false, verified: false, notes: 'No error message association' },
      labelAssociation: { detected: false, verified: false, notes: 'Generic aria-label only' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: false,
      cognitiveLoadAssessed: false
    },
    overallConfidence: 0.6,
    criticalIssues: [
      'Generic aria-label not descriptive',
      'No aria-labelledby support',
      'Missing error message association'
    ]
  },

  'Dialog': {
    component: 'Dialog',
    wcag21_aa: AccessibilityStatus.COMPLIANT,
    automated: {
      colorContrast: 'UNKNOWN',
      ariaAttributes: 'PASS',
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: true, verified: true, notes: 'Good focus trapping from Base UI' },
      errorHandling: { detected: false, verified: false, notes: 'Not applicable' },
      labelAssociation: { detected: true, verified: true, notes: 'Has Title and Description components' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: true,
      cognitiveLoadAssessed: true
    },
    overallConfidence: 0.8,
    criticalIssues: [
      'Color contrast verification needed'
    ]
  },

  'Combobox': {
    component: 'Combobox',
    wcag21_aa: AccessibilityStatus.PARTIAL,
    automated: {
      colorContrast: 'UNKNOWN',
      ariaAttributes: 'PASS', // Good ARIA implementation
      keyboardNav: 'PASS',
      focusManagement: 'PASS',
      semanticHTML: 'PASS'
    },
    semiAutomated: {
      focusVisible: { detected: true, verified: true, notes: 'Good focus management' },
      errorHandling: { detected: true, verified: false, notes: 'Has error states but no aria-describedby' },
      labelAssociation: { detected: false, verified: false, notes: 'No aria-labelledby support' }
    },
    manual: {
      screenReaderTested: false,
      userJourneyValidated: false,
      contentReviewed: false,
      cognitiveLoadAssessed: false
    },
    overallConfidence: 0.7,
    criticalIssues: [
      'Missing label association support',
      'No live regions for dynamic updates'
    ],
  }
};

export const getComponentStatus = (componentName: string): ComponentA11yStatus | undefined => {
  return COMPONENT_A11Y_STATUS[componentName];
};

export const getAllComponents = (): ComponentA11yStatus[] => {
  return Object.values(COMPONENT_A11Y_STATUS);
};

export const getComponentsByStatus = (status: string): ComponentA11yStatus[] => {
  return getAllComponents().filter(component => component.wcag21_aa === status);
};

export const getOverallSystemScore = (): number => {
  const components = getAllComponents();
  const totalScore = components.reduce((sum, component) => sum + component.overallConfidence, 0);
  return components.length > 0 ? totalScore / components.length : 0;
};