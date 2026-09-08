<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue: boolean;
        images: string[];
        initialIndex?: number;
    }>(),
    {
        initialIndex: 0,
        images: () => []
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const currentIndex = ref(props.initialIndex);
const scale = ref(1);
const position = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });
const hasDragged = ref(false);

const currentImage = computed(() => {
    if (!props.images || props.images.length === 0) return '';
    return props.images[currentIndex.value] || '';
});

const canPrev = computed(() => props.images.length > 1);
const canNext = computed(() => props.images.length > 1);

const resetTransform = () => {
    scale.value = 1;
    position.value = { x: 0, y: 0 };
    isDragging.value = false;
    hasDragged.value = false;
};

const close = () => {
    emit('update:modelValue', false);
};

const prevImage = () => {
    if (props.images.length <= 1) return;
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        currentIndex.value = props.images.length - 1;
    }
    resetTransform();
};

const nextImage = () => {
    if (props.images.length <= 1) return;
    if (currentIndex.value < props.images.length - 1) {
        currentIndex.value++;
    } else {
        currentIndex.value = 0;
    }
    resetTransform();
};

const zoomIn = () => {
    scale.value = Math.min(3.5, Number((scale.value + 0.35).toFixed(2)));
};

const zoomOut = () => {
    const nextScale = Math.max(1, Number((scale.value - 0.35).toFixed(2)));
    scale.value = nextScale;
    if (nextScale === 1) {
        position.value = { x: 0, y: 0 };
    }
};

const toggleZoom = () => {
    if (scale.value > 1) {
        resetTransform();
    } else {
        scale.value = 2;
    }
};

const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        // Zoom in
        scale.value = Math.min(3.5, Number((scale.value + 0.2).toFixed(2)));
    } else {
        // Zoom out
        const nextScale = Math.max(1, Number((scale.value - 0.2).toFixed(2)));
        scale.value = nextScale;
        if (nextScale === 1) {
            position.value = { x: 0, y: 0 };
        }
    }
};

const onMouseDown = (e: MouseEvent) => {
    if (scale.value <= 1) return;
    isDragging.value = true;
    hasDragged.value = false;
    dragStart.value = {
        x: e.clientX - position.value.x,
        y: e.clientY - position.value.y
    };
};

const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return;
    hasDragged.value = true;
    position.value = {
        x: e.clientX - dragStart.value.x,
        y: e.clientY - dragStart.value.y
    };
};

const onMouseUp = () => {
    isDragging.value = false;
};

// Touch support for mobile/tablets
const onTouchStart = (e: TouchEvent) => {
    if (scale.value <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    isDragging.value = true;
    hasDragged.value = false;
    dragStart.value = {
        x: touch.clientX - position.value.x,
        y: touch.clientY - position.value.y
    };
};

const onTouchMove = (e: TouchEvent) => {
    if (!isDragging.value || e.touches.length !== 1) return;
    hasDragged.value = true;
    const touch = e.touches[0];
    position.value = {
        x: touch.clientX - dragStart.value.x,
        y: touch.clientY - dragStart.value.y
    };
};

const onTouchEnd = () => {
    isDragging.value = false;
};

const onBackdropClick = (e: MouseEvent) => {
    // Only close if clicking directly on overlay or container and not dragged
    if (!hasDragged.value) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('lightbox-backdrop') || target.classList.contains('lightbox-image-stage')) {
            close();
        }
    }
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.modelValue) return;

    switch (e.key) {
        case 'Escape':
            close();
            break;
        case 'ArrowLeft':
            prevImage();
            break;
        case 'ArrowRight':
            nextImage();
            break;
        case '+':
        case '=':
            zoomIn();
            break;
        case '-':
        case '_':
            zoomOut();
            break;
        case '0':
            resetTransform();
            break;
    }
};

watch(
    () => props.modelValue,
    (isOpen) => {
        if (isOpen) {
            currentIndex.value = props.initialIndex || 0;
            resetTransform();
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            resetTransform();
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        }
    }
);

watch(
    () => props.initialIndex,
    (newIndex) => {
        currentIndex.value = newIndex;
        resetTransform();
    }
);

onMounted(() => {
    if (props.modelValue) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
    }
});

onBeforeUnmount(() => {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <teleport to="body">
        <transition name="lightbox-fade">
            <div
                v-if="modelValue"
                class="lightbox-backdrop"
                @click="onBackdropClick"
                @mousemove="onMouseMove"
                @mouseup="onMouseUp"
                @mouseleave="onMouseUp"
            >
                <!-- Top Toolbar -->
                <div class="lightbox-toolbar" @click.stop>
                    <div class="toolbar-left">
                        <div class="counter-badge font-mono" v-if="images.length > 0">
                            {{ currentIndex + 1 }} / {{ images.length }}
                        </div>
                    </div>

                    <div class="toolbar-right">
                        <!-- Zoom Out -->
                        <button
                            class="tool-btn"
                            :disabled="scale <= 1"
                            @click="zoomOut"
                            title="Zoom Out (-)"
                            aria-label="Zoom Out"
                        >
                            <v-icon size="20">mdi-magnify-minus-outline</v-icon>
                        </button>

                        <!-- Zoom Indicator -->
                        <span class="zoom-pct font-mono">
                            {{ Math.round(scale * 100) }}%
                        </span>

                        <!-- Zoom In -->
                        <button
                            class="tool-btn"
                            :disabled="scale >= 3.5"
                            @click="zoomIn"
                            title="Zoom In (+)"
                            aria-label="Zoom In"
                        >
                            <v-icon size="20">mdi-magnify-plus-outline</v-icon>
                        </button>

                        <!-- Reset Zoom -->
                        <button
                            class="tool-btn"
                            :class="{ active: scale !== 1 }"
                            @click="resetTransform"
                            title="Reset Zoom (0)"
                            aria-label="Reset Zoom"
                        >
                            <v-icon size="20">mdi-restore</v-icon>
                        </button>

                        <div class="divider"></div>

                        <!-- Close Button -->
                        <button
                            class="tool-btn close-btn"
                            @click="close"
                            title="Close (Esc)"
                            aria-label="Close Lightbox"
                        >
                            <v-icon size="22">mdi-close</v-icon>
                        </button>
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <button
                    v-if="canPrev"
                    class="nav-btn prev-btn"
                    @click.stop="prevImage"
                    title="Previous (Left Arrow)"
                    aria-label="Previous Image"
                >
                    <v-icon size="30">mdi-chevron-left</v-icon>
                </button>

                <button
                    v-if="canNext"
                    class="nav-btn next-btn"
                    @click.stop="nextImage"
                    title="Next (Right Arrow)"
                    aria-label="Next Image"
                >
                    <v-icon size="30">mdi-chevron-right</v-icon>
                </button>

                <!-- Stage & Image -->
                <div
                    class="lightbox-image-stage"
                    @wheel="handleWheel"
                    @mousedown="onMouseDown"
                    @touchstart="onTouchStart"
                    @touchmove="onTouchMove"
                    @touchend="onTouchEnd"
                >
                    <div
                        class="image-wrapper"
                        :style="{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                            transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0, 0.2, 1)'
                        }"
                        @dblclick.stop="toggleZoom"
                    >
                        <img
                            :src="currentImage"
                            alt="Screenshot preview"
                            class="lightbox-img"
                            draggable="false"
                        />
                    </div>
                </div>

                <!-- Bottom Helper Hint -->
                <div class="lightbox-hint">
                    <span v-if="scale === 1">Double-click or scroll to zoom &bull; Drag to pan</span>
                    <span v-else>Drag to pan &bull; Scroll to zoom &bull; Double-click to reset</span>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped lang="scss">
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
    opacity: 0;
}

.lightbox-fade-enter-from .lightbox-img,
.lightbox-fade-leave-to .lightbox-img {
    transform: scale(0.95);
}

.lightbox-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(6, 9, 14, 0.94);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    z-index: 99999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    user-select: none;
    overflow: hidden;
}

/* Toolbar */
.lightbox-toolbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to bottom, rgba(6, 9, 14, 0.8) 0%, rgba(6, 9, 14, 0) 100%);
    z-index: 10;

    .counter-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.35rem 0.85rem;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 9999px;
        color: #e2e8f0;
        font-size: 0.875rem;
        font-weight: 600;
        letter-spacing: 0.05em;
    }

    .toolbar-right {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(18, 24, 38, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0.3rem 0.5rem;
        border-radius: 9999px;
        backdrop-filter: blur(8px);

        .zoom-pct {
            font-size: 0.8rem;
            color: #94a3b8;
            min-width: 44px;
            text-align: center;
        }

        .divider {
            width: 1px;
            height: 18px;
            background: rgba(255, 255, 255, 0.15);
            margin: 0 0.2rem;
        }

        .tool-btn {
            background: transparent;
            border: none;
            color: #cbd5e1;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.12);
                color: #ffffff;
            }

            &:disabled {
                opacity: 0.35;
                cursor: not-allowed;
            }

            &.active {
                color: #38bdf8;
            }

            &.close-btn:hover {
                background: rgba(239, 68, 68, 0.2);
                color: #ef4444;
            }
        }
    }
}

/* Nav Buttons */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(18, 24, 38, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #ffffff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);

    &:hover {
        background: rgba(255, 255, 255, 0.18);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-50%) scale(1.08);
    }

    &.prev-btn {
        left: 1.5rem;
    }

    &.next-btn {
        right: 1.5rem;
    }

    @media (max-width: 640px) {
        width: 40px;
        height: 40px;

        &.prev-btn {
            left: 0.75rem;
        }

        &.next-btn {
            right: 0.75rem;
        }
    }
}

/* Image Stage */
.lightbox-image-stage {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 70px 20px 40px 20px;
    box-sizing: border-box;

    .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 90vw;
        max-height: 84vh;
        will-change: transform;
        transform-origin: center center;

        .lightbox-img {
            max-width: 90vw;
            max-height: 84vh;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 6px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.1);
            user-select: none;
            -webkit-user-drag: none;
        }
    }
}

/* Bottom Hint */
.lightbox-hint {
    position: absolute;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: #64748b;
    background: rgba(10, 14, 22, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0.25rem 0.85rem;
    border-radius: 9999px;
    pointer-events: none;
    letter-spacing: 0.02em;
    backdrop-filter: blur(4px);
}
</style>
