<script setup lang="ts">
import experienceData from '@/data/experience.json'

interface ExperienceItem {
  id: string
  period: string
  role: string
  company: string
  location?: string
  type?: string
  responsibilities: string[]
  technologies?: string[]
}

const experiences: ExperienceItem[] = experienceData
</script>

<template>
  <v-container fluid class="experience-section-container px-4 px-md-12 py-12 py-md-16">
    <div class="container">
      <!-- Section Header -->
      <div class="header-box d-flex flex-column align-start ga-3 mb-10 mb-md-14 fade-in-textBottom">
        <h2 class="section-title">CAREER JOURNEY</h2>
        <p class="section-subtitle">
          My professional track record, engineering roles, and technical contributions.
        </p>
      </div>

      <!-- Experience Timeline Wrapper -->
      <div class="timeline-wrapper fade-in-textBottom">
        <!-- Main Continuous Vertical Spine -->
        <div class="timeline-spine"></div>

        <div class="timeline-list">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.id"
            class="timeline-item position-relative"
          >
            <!-- Node Indicator on the line -->
            <div class="timeline-node" :class="{ 'node-active': index === 0 }">
              <div class="node-core"></div>
              <div class="node-ring" v-if="index === 0"></div>
            </div>

            <!-- Content Row -->
            <div class="timeline-row">
              <!-- Left Column: Period & Meta -->
              <div class="period-col">
                <div class="period-badge font-mono" :class="{ 'current-badge': index === 0 }">
                  {{ exp.period }}
                </div>
                <div v-if="exp.type" class="type-text font-mono mt-1">
                  {{ exp.type }}
                </div>
              </div>

              <!-- Right Column: Details Card -->
              <div class="details-col">
                <div class="role-header d-flex flex-wrap align-baseline justify-space-between ga-2">
                  <h3 class="role-title">{{ exp.role }}</h3>
                </div>

                <div class="company-meta d-flex flex-wrap align-center ga-2 mt-1 mb-3">
                  <span class="company-name font-mono">{{ exp.company }}</span>
                  <span v-if="exp.location" class="location-dot">·</span>
                  <span v-if="exp.location" class="company-location font-mono text-caption">{{ exp.location }}</span>
                </div>

                <!-- Responsibilities Bullet List -->
                <ul class="responsibilities-list">
                  <li
                    v-for="(item, idx) in exp.responsibilities"
                    :key="idx"
                    class="responsibility-item"
                  >
                    <span class="bullet-point"></span>
                    <span class="responsibility-text">{{ item }}</span>
                  </li>
                </ul>

                <!-- Tech Stack Tags -->
                <div v-if="exp.technologies && exp.technologies.length" class="tech-tags-wrapper d-flex flex-wrap align-center ga-2 mt-4">
                  <span
                    v-for="tech in exp.technologies"
                    :key="tech"
                    class="tech-tag font-mono"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.experience-section-container {
  overflow: hidden;
  position: relative;
  border-top: 1px solid var(--color-border-subtle);
}

.container {
  margin: 1rem auto;
  max-width: 1320px;
}

.section-title {
  font-weight: 700;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  letter-spacing: -0.02em;
  color: #ffffff;
  line-height: 1.2;
}

.section-subtitle {
  color: var(--color-fg-muted);
  font-size: 1rem;
  max-width: 620px;
  margin: 0;
  line-height: 1.6;
}

/* Timeline Architecture */
.timeline-wrapper {
  position: relative;
  padding-left: 20px;

  @media (min-width: 768px) {
    padding-left: 24px;
  }
}

/* Continuous Vertical Spine */
.timeline-spine {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    #3b82f6 0%,
    rgba(59, 130, 246, 0.6) 40%,
    rgba(59, 130, 246, 0.2) 80%,
    rgba(255, 255, 255, 0.06) 100%
  );
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 768px) {
    gap: 3rem;
  }
}

.timeline-item {
  position: relative;
  transition: all 0.25s ease;

  &:hover {
    .timeline-node .node-core {
      background-color: #60a5fa;
      box-shadow: 0 0 14px rgba(96, 165, 250, 0.9);
      transform: scale(1.25);
    }

    .period-badge {
      color: #93c5fd;
    }

    .details-col {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(59, 130, 246, 0.25);
    }
  }
}

/* Timeline Node / Anchor Dot */
.timeline-node {
  position: absolute;
  left: -20px;
  top: 8px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  @media (min-width: 768px) {
    left: -24px;
  }

  .node-core {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #3b82f6;
    border: 2px solid var(--color-canvas-default);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.7);
    transition: all 0.25s ease;
  }

  &.node-active .node-core {
    background-color: #60a5fa;
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.9);
  }

  .node-ring {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px dashed rgba(96, 165, 250, 0.5);
    animation: spin 8s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Timeline Content Layout */
.timeline-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 2rem;
    align-items: flex-start;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 210px 1fr;
    gap: 2.5rem;
  }
}

/* Left Column: Period */
.period-col {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 4px;

  .period-badge {
    font-size: 1.125rem;
    font-weight: 700;
    color: #3b82f6;
    letter-spacing: -0.01em;
    line-height: 1.3;
    transition: color 0.2s ease;

    &.current-badge {
      color: #60a5fa;
    }
  }

  .type-text {
    letter-spacing: 0.04em;
    font-size: 0.8rem;
    color: #94a3b8;
    margin-top: 2px;
  }
}

/* Right Column: Details */
.details-col {
  background: rgba(255, 255, 255, 0.012);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
  padding: 1.25rem 1.5rem;
  transition: all 0.25s ease;

  @media (min-width: 768px) {
    padding: 1.5rem 1.75rem;
  }

  .role-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 1.35rem;
    }
  }

  .company-meta {
    .company-name {
      color: #60a5fa;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .location-dot {
      color: var(--color-fg-subtle);
    }

    .company-location {
      color: var(--color-fg-muted);
      font-size: 0.85rem;
    }
  }
}

/* Responsibilities List */
.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  .responsibility-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;

    .bullet-point {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #3b82f6;
      margin-top: 0.6rem;
      flex-shrink: 0;
    }

    .responsibility-text {
      color: var(--color-fg-muted);
      font-size: 0.93rem;
      line-height: 1.6;
    }
  }
}

/* Tech Stack Badges */
.tech-tags-wrapper {
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .tech-tag {
    font-size: 0.75rem;
    padding: 3px 10px;
    background-color: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--color-border-subtle);
    border-radius: 4px;
    color: var(--color-fg-muted);
    transition: all 0.2s ease;

    &:hover {
      background-color: rgba(59, 130, 246, 0.12);
      border-color: rgba(59, 130, 246, 0.4);
      color: #93c5fd;
    }
  }
}
</style>
