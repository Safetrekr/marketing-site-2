/**
 * System check definitions for the gateway boot sequence.
 *
 * Each check maps to a real Safetrekr capability while maintaining
 * the mission-control aesthetic. Order creates a narrative arc:
 * route → risk → environment → tracking → location → comms → guardian → authority.
 *
 * @module gateway-checks
 */

export interface GatewayCheckDef {
  id: string
  label: string
  completionValue: string
}

export const GATEWAY_CHECKS: GatewayCheckDef[] = [
  { id: 'route', label: 'Route analysis', completionValue: 'OK' },
  { id: 'risk', label: 'Risk feed sync', completionValue: 'OK' },
  { id: 'env', label: 'Environment scan', completionValue: 'OK' },
  { id: 'beacon', label: 'Traveler beacon', completionValue: 'OK' },
  { id: 'grid', label: 'Location grid', completionValue: 'OK' },
  { id: 'emergency', label: 'Emergency channel', completionValue: 'OK' },
  { id: 'guardian', label: 'Guardian link', completionValue: 'OK' },
  { id: 'authority', label: 'Command authority', completionValue: 'VERIFIED' },
] as const
