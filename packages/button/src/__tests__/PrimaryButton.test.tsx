import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PrimaryButton } from '../components/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders button text', () => {
    render(<PrimaryButton>Test</PrimaryButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Test');
  });
});
