"use client";
import React from 'react'
import InteractiveSynapseNetwork, {
  InteractiveSynapseNetworkProps,
} from '@/components/ui/interactive-synapse-network'

export const InteractiveSynapseNetworkDemo = () => {
  const glowStyle = '0 0 5px #00dcff, 0 0 10px #00dcff'
  const demoProps: InteractiveSynapseNetworkProps = {
    nodeColor: 'rgba(0,220,255,0.8)',
    pulseColor: 'rgba(255,255,255,1)',
    nodeCount: 60,
    connectionRadius: 180,
    trailOpacity: 0.15,
    className: 'flex items-center justify-center',
  }

  return (
    <InteractiveSynapseNetwork {...demoProps}>
      <div className="text-center select-none">
        <div className="px-8 py-6 bg-black/20 backdrop-blur-sm rounded-xl">
          <h1
            className="text-5xl sm:text-7xl font-bold uppercase tracking-widest text-cyan-200"
            style={{ textShadow: glowStyle }}
          >
            Synapse
          </h1>
          <h2 className="mt-2 text-lg sm:text-2xl uppercase tracking-wider text-cyan-200/70">
            Interactive Network
          </h2>
        </div>
        <p className="mt-8 text-sm text-cyan-200/40 font-mono">
          The cursor excites the neural pathways.
        </p>
      </div>
    </InteractiveSynapseNetwork>
  )
}

export default InteractiveSynapseNetworkDemo
