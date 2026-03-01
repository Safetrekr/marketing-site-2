/**
 * Gateway page -- cinematic entry point for Safetrekr.
 *
 * Runs a <10s boot ritual communicating safety intelligence
 * capabilities, then reveals two paths: Mission Control (spatial ZUI)
 * and Read the Brief (traditional marketing site).
 *
 * Server component shell — all client logic lives in GatewayScene.
 *
 * @module page
 */

import { GatewayScene } from '@/components/gateway/gateway-scene'

import '@/styles/gateway.css'
import '@/styles/enrichment.css'

export default function GatewayPage() {
  return <GatewayScene />
}
