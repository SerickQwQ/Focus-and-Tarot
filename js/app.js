(function() {
    'use strict';

    /* ============ 提示音（MP3） ============ */
    var SOUND_KEY = 'ft_sound';
    var soundMuted = localStorage.getItem(SOUND_KEY) === 'off';

    function getAudioEl(kind) {
        return document.getElementById(kind === 'break' ? 'audio-break-end' : 'audio-focus-end');
    }

    function unlockAudio() {
        ['audio-focus-end', 'audio-break-end'].forEach(function(id) {
            var el = document.getElementById(id);
            if (!el) return;
            try {
                el.volume = 0;
                var p = el.play();
                if (p && p.then) {
                    p.then(function() {
                        el.pause();
                        el.currentTime = 0;
                        el.volume = 1;
                    }).catch(function() {
                        el.volume = 1;
                    });
                } else {
                    el.pause();
                    el.currentTime = 0;
                    el.volume = 1;
                }
            } catch (e) {
                try { el.volume = 1; } catch (e2) {}
            }
        });
    }

    function playChime(kind) {
        if (soundMuted) return;
        var el = getAudioEl(kind);
        if (!el) return;
        try {
            el.currentTime = 0;
            el.volume = 1;
            var p = el.play();
            if (p && p.catch) p.catch(function() {});
        } catch (e) {}
    }

    function updateSoundBtn() {
        var btn = document.getElementById('sound-toggle');
        if (!btn) return;
        var icon = document.getElementById('sound-icon');
        var text = document.getElementById('sound-text');
        if (soundMuted) {
            btn.classList.add('muted');
            if (icon) icon.textContent = '🔕';
            if (text) text.textContent = t('soundOff');
        } else {
            btn.classList.remove('muted');
            if (icon) icon.textContent = '🔔';
            if (text) text.textContent = t('soundOn');
        }
    }

    /* ============ 语言包 ============ */
    var I18N = {
        zh: {
            navHome: '🏠 首页',
            navPomodoro: '🍅 番茄钟',
            navFortune: '🔮 今日运势',
            navTodos: '✅ 待办',
            navStats: '📊 统计',
            navHomeM: '首页',
            navPomodoroM: '番茄',
            navFortuneM: '运势',
            navTodosM: '待办',
            navStatsM: '统计',

            homeTitle: '今天也专注一点',
            homeSub: '四个板块的概况，点卡片进入详情',
            pomodoroTitle: '番茄钟',
            pomodoroSub: '专注一段时间，然后好好休息',
            fortuneTitle: '今日运势',
            fortuneSub: '每天抽一张塔罗牌，看看今天的能量',
            todosTitle: '待办清单',
            todosSub: '把要做的事写下来，专注时关联它',
            statsTitle: '今日概览',
            statsSub: '专注与完成情况一目了然',

            cardPomodoro: '番茄钟',
            cardFortune: '今日运势',
            cardTodos: '待办清单',
            cardStats: '统计看板',

            tomatoCountUnit: '个番茄',
            tomatoUnit: ' 个番茄',
            minUnit: '分钟',
            secUnit: '秒',
            percentComplete: '% 完成',
            focusTodayLabel: '今日专注',
            last7Days: '最近 7 天专注时长',

            notDrawn: '还没抽牌',
            tapToDraw: '点进去抽一张',
            ovTodoMetaTpl: '{d} / {t} 已完成',

            focusMode: '专注',
            shortMode: '短休息',
            longMode: '长休息',
            timerFocusing: '专注中',
            timerShortBreak: '短休息',
            timerLongBreak: '长休息',
            start: '开始',
            pause: '暂停',
            resume: '继续',
            reset: '重置',

            currentFocus: '本次专注',
            linkTodo: '关联待办（可选）',
            noLink: '不关联',
            todayCompleted: '今日已完成',
            focusHint: '专注结束后会自动记录到统计页，并给关联的待办 +1 🍅',

            soundLabel: '结束提示音',
            soundOn: '开',
            soundOff: '关',
            soundOnToast: '提示音已开启',
            soundOffToast: '提示音已关闭',

            customDuration: '自定义时长',
            durationFocus: '专注（秒）',
            durationShort: '短休息（秒）',
            durationLong: '长休息（秒）',
            saveSettings: '保存设置',
            resetDefault: '恢复默认',
            durationHint: '专注范围 1–10800 秒（最长 180 分钟），休息范围 1–3600 秒（最长 60 分钟）。保存后如果正在计时，会自动重置当前计时器。',

            drawCard: '抽一张牌',
            comeBackTomorrow: '明天再来',
            dailyHint: '今天已经抽过啦，明天再来吧',
            readingTitle: '牌义解读',
            readingHint: '点击上方按钮，抽一张属于今天的牌',
            alreadyDrawnToast: '今天已经抽过了，明天再来吧',

            todoPlaceholder: '写一件要完成的事…',
            addBtn: '添加',
            pleaseEnter: '先写点什么吧',
            addedToast: '已添加',
            emptyTodo: '还没有待办，先添加一条吧。',

            statFocusToday: '今日专注',
            statPomodorosToday: '今日番茄',
            statTodoRate: '待办完成率',
            statLast7: '最近 7 天专注',
            statTodoStatus: '待办完成情况',

            weekStreak: '连续专注',
            weekTotal: '本周专注',
            weekTomato: '本周番茄',
            dayUnit: '天',
            countUnit: '个',

            greetingMorning: '早上好',
            greetingAfternoon: '下午好',
            greetingEvening: '晚上好',
            monthWeekTpl: '{m}月 · 周{d}',

            focusDoneToast: '专注完成！休息一下吧 🎉',
            breakDoneToast: '休息结束，继续专注吧 💪',
            pauseFirstToast: '先暂停或重置再切换模式',
            settingsSavedToast: '设置已保存',
            defaultsRestoredToast: '已恢复默认时长',

            langBtnText: 'EN',
            docTitle: 'Focus & Tarot · 专注小站'
        },
        en: {
            navHome: '🏠 Home',
            navPomodoro: '🍅 Pomodoro',
            navFortune: '🔮 Fortune',
            navTodos: '✅ Todos',
            navStats: '📊 Stats',
            navHomeM: 'Home',
            navPomodoroM: 'Pomo',
            navFortuneM: 'Tarot',
            navTodosM: 'Todo',
            navStatsM: 'Stats',

            homeTitle: "Stay focused today",
            homeSub: 'A quick overview of all four sections. Tap a card to open it.',
            pomodoroTitle: 'Pomodoro',
            pomodoroSub: 'Focus for a while, then take a good break.',
            fortuneTitle: "Today's Fortune",
            fortuneSub: "Draw one tarot card a day to check today's energy.",
            todosTitle: 'Todo List',
            todosSub: 'Write down what you need to do and link it during focus.',
            statsTitle: "Today's Overview",
            statsSub: 'A clear view of focus and completion.',

            cardPomodoro: 'Pomodoro',
            cardFortune: 'Fortune',
            cardTodos: 'Todos',
            cardStats: 'Stats',

            tomatoCountUnit: 'tomatoes',
            tomatoUnit: ' tomatoes',
            minUnit: 'min',
            secUnit: 's',
            percentComplete: '% done',
            focusTodayLabel: 'Focus today',
            last7Days: 'Focus time in the last 7 days',

            notDrawn: 'Not drawn yet',
            tapToDraw: 'Tap to draw',
            ovTodoMetaTpl: '{d} / {t} completed',

            focusMode: 'Focus',
            shortMode: 'Short break',
            longMode: 'Long break',
            timerFocusing: 'Focusing',
            timerShortBreak: 'Short break',
            timerLongBreak: 'Long break',
            start: 'Start',
            pause: 'Pause',
            resume: 'Resume',
            reset: 'Reset',

            currentFocus: 'This session',
            linkTodo: 'Link a todo (optional)',
            noLink: 'None',
            todayCompleted: 'Completed today',
            focusHint: 'After a focus session, it will be recorded on the stats page and the linked todo gets +1 🍅',

            soundLabel: 'End chime',
            soundOn: 'On',
            soundOff: 'Off',
            soundOnToast: 'Sound on',
            soundOffToast: 'Sound off',

            customDuration: 'Custom durations',
            durationFocus: 'Focus (sec)',
            durationShort: 'Short break (sec)',
            durationLong: 'Long break (sec)',
            saveSettings: 'Save',
            resetDefault: 'Reset to defaults',
            durationHint: "Focus 1–10800 sec (up to 180 min), breaks 1–3600 sec (up to 60 min). Saving will reset the current timer if it's running.",

            drawCard: 'Draw a card',
            comeBackTomorrow: 'Come back tomorrow',
            dailyHint: "You've already drawn today. Come back tomorrow.",
            readingTitle: 'Interpretation',
            readingHint: "Tap the button above to draw today's card.",
            alreadyDrawnToast: 'Already drawn today. Come back tomorrow.',

            todoPlaceholder: 'What do you need to finish?',
            addBtn: 'Add',
            pleaseEnter: 'Please write something',
            addedToast: 'Added',
            emptyTodo: 'No todos yet. Add one to get started.',

            statFocusToday: 'Focus today',
            statPomodorosToday: 'Pomodoros today',
            statTodoRate: 'Todo completion',
            statLast7: 'Focus in last 7 days',
            statTodoStatus: 'Todo completion',

            weekStreak: 'Current streak',
            weekTotal: 'This week',
            weekTomato: 'Pomodoros',
            dayUnit: 'days',
            countUnit: '',

            greetingMorning: 'Good morning',
            greetingAfternoon: 'Good afternoon',
            greetingEvening: 'Good evening',
            monthWeekTpl: '{m} · {d}',

            focusDoneToast: 'Focus done! Take a break 🎉',
            breakDoneToast: "Break's over. Time to focus 💪",
            pauseFirstToast: 'Pause or reset first before switching modes',
            settingsSavedToast: 'Settings saved',
            defaultsRestoredToast: 'Defaults restored',

            langBtnText: '中',
            docTitle: 'Focus & Tarot · Focus Station'
        }
    };

    var LANG_KEY = 'ft_lang';
    var lang = localStorage.getItem(LANG_KEY) || 'en';
    if (!I18N[lang]) lang = 'en';

    function t(key) { return I18N[lang][key] != null ? I18N[lang][key] : key; }

    var toastTimer = null;

    function toast(msg) {
        var el = document.getElementById('toast');
        el.textContent = msg;
        el.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function() { el.classList.remove('show'); }, 2200);
    }

    function todayStr() {
        var d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function dateStr(d) {
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function(c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

    function countUp(el, to, duration) {
        if (!el) return;
        duration = duration || 600;
        var from = parseInt(el.textContent, 10) || 0;
        to = Number(to) || 0;
        if (from === to) { el.textContent = to; return; }
        var start = performance.now();

        function step(now) {
            var tt = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - tt, 3);
            el.textContent = Math.round(from + (to - from) * eased);
            if (tt < 1) requestAnimationFrame(step);
            else el.textContent = to;
        }
        requestAnimationFrame(step);
    }

    function formatDuration(seconds) {
        var s = Math.max(0, Math.round(seconds));
        if (s < 60) return { v: s, unitKey: 'secUnit' };
        return { v: Math.round(s / 60), unitKey: 'minUnit' };
    }

    function recSeconds(r) {
        if (!r) return 0;
        if (r.seconds != null) return Number(r.seconds) || 0;
        return (Number(r.minutes) || 0) * 60;
    }

    function applyStagger(pageEl) {
        if (!pageEl) return;
        var items = pageEl.querySelectorAll('.card, .overview-card, .hero-main, .hero-date');
        items.forEach(function(el, i) {
            el.style.animationDelay = (i * 55) + 'ms';
        });
    }

    function switchPage(id) {
        document.querySelectorAll('.page').forEach(function(p) {
            p.classList.toggle('active', p.id === id);
        });
        document.querySelectorAll('[data-page]').forEach(function(b) {
            b.classList.toggle('active', b.dataset.page === id);
        });
        var pageEl = document.getElementById(id);
        applyStagger(pageEl);

        if (id === 'home') renderHome();
        if (id === 'todos') renderTodos();
        if (id === 'stats') renderStats();
        if (id === 'fortune') { ensureDailyTarotFresh();
            syncFortunePage(); }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('[data-page]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            switchPage(btn.dataset.page);
        });
    });

    var TODO_KEY = 'ft_todos';
    var RECORD_KEY = 'ft_records';
    var DAILY_TAROT_KEY = 'ft_daily_tarot';
    var DURATION_KEY = 'ft_durations_sec';
    var DEFAULT_DURATIONS = { focus: 1500, short: 300, long: 900 };

    var todos = [];
    var focusRecords = [];
    var dailyTarot = null;
    var durations = loadDurations();

    try {
        todos = JSON.parse(localStorage.getItem(TODO_KEY) || '[]');
        if (!Array.isArray(todos)) todos = [];
    } catch (e) { todos = []; }

    try {
        focusRecords = JSON.parse(localStorage.getItem(RECORD_KEY) || '[]');
        if (!Array.isArray(focusRecords)) focusRecords = [];
    } catch (e) { focusRecords = []; }

    try {
        dailyTarot = JSON.parse(localStorage.getItem(DAILY_TAROT_KEY) || 'null');
        if (!dailyTarot || dailyTarot.date !== todayStr()) dailyTarot = null;
    } catch (e) { dailyTarot = null; }

    function loadDurations() {
        try {
            var d = JSON.parse(localStorage.getItem(DURATION_KEY) || 'null');
            if (d && typeof d === 'object') {
                return {
                    focus: clamp(Math.round(Number(d.focus) || DEFAULT_DURATIONS.focus), 1, 10800),
                    short: clamp(Math.round(Number(d.short) || DEFAULT_DURATIONS.short), 1, 3600),
                    long: clamp(Math.round(Number(d.long) || DEFAULT_DURATIONS.long), 1, 3600)
                };
            }
        } catch (e) {}
        return { focus: DEFAULT_DURATIONS.focus, short: DEFAULT_DURATIONS.short, long: DEFAULT_DURATIONS.long };
    }

    function saveTodos() { localStorage.setItem(TODO_KEY, JSON.stringify(todos)); }

    function saveRecords() { localStorage.setItem(RECORD_KEY, JSON.stringify(focusRecords)); }

    function saveDailyTarot() {
        if (dailyTarot) localStorage.setItem(DAILY_TAROT_KEY, JSON.stringify(dailyTarot));
        else localStorage.removeItem(DAILY_TAROT_KEY);
    }

    function saveDurations() { localStorage.setItem(DURATION_KEY, JSON.stringify(durations)); }

    /* ============ 塔罗数据（14 张，带图片路径） ============ */
    var TAROT = [{
            symbol: '🃏',
            image: './images/tarot/00-fool.jpg',
            zh: {
                name: '愚者',
                keywords: '新开始 · 冒险 · 纯真',
                reading: '今天适合迈出一小步。不必把路想得很清楚，先出发，答案会在路上慢慢出现。放下对"必须完美"的执念，给自己一次轻松尝试的机会。'
            },
            en: {
                name: 'The Fool',
                keywords: 'New Beginnings · Adventure · Innocence',
                reading: "Take a small step today. You don't need the whole path figured out—just start, and answers will appear along the way."
            }
        },
        {
            symbol: '✨',
            image: './images/tarot/01-magician.jpg',
            zh: {
                name: '魔术师',
                keywords: '创造力 · 行动 · 资源',
                reading: '你手边已有的东西，比你以为的更有用。今天适合把想法落到具体动作上，写下第一行字、发出第一条消息、开始第一个 25 分钟。'
            },
            en: {
                name: 'The Magician',
                keywords: 'Creativity · Action · Resources',
                reading: 'What you already have is more useful than you think. Put ideas into concrete action today.'
            }
        },
        {
            symbol: '🌙',
            image: './images/tarot/02-high-priestess.jpg',
            zh: {
                name: '女祭司',
                keywords: '直觉 · 内省 · 静默',
                reading: '今天不必急着表达。安静一点，听听自己真实的想法。有些答案不在搜索框里，而在你独处时冒出来的那个念头上。'
            },
            en: {
                name: 'The High Priestess',
                keywords: 'Intuition · Introspection · Silence',
                reading: "No need to rush to express. Quiet down and listen to what you really think."
            }
        },
        {
            symbol: '👑',
            image: './images/tarot/03-empress.jpg',
            zh: {
                name: '皇后',
                keywords: '丰盛 · 滋养 · 感官',
                reading: '适合照顾自己。好好吃一顿饭，整理一下桌面，给身体一点舒展。被滋养的状态，才撑得起长时间的专注。'
            },
            en: {
                name: 'The Empress',
                keywords: 'Abundance · Nurturing · Senses',
                reading: 'Take care of yourself. Only a nourished body can hold long stretches of focus.'
            }
        },
        {
            symbol: '🛡️',
            image: './images/tarot/04-emperor.jpg',
            zh: {
                name: '皇帝',
                keywords: '秩序 · 掌控 · 责任',
                reading: '今天适合建立结构。列一份清单，排出优先级，把混乱的事情归位。秩序不是束缚，而是让你更省力地前进。'
            },
            en: {
                name: 'The Emperor',
                keywords: 'Order · Control · Responsibility',
                reading: 'Build structure today. Structure frees you up rather than tying you down.'
            }
        },
        {
            symbol: '💞',
            image: './images/tarot/05-lovers.jpg',
            zh: {
                name: '恋人',
                keywords: '选择 · 结合 · 价值',
                reading: '今天可能会面对一个选择。别只看哪个更容易，问问自己更在意什么。诚实的选择，后面走起来才不会拧巴。'
            },
            en: {
                name: 'The Lovers',
                keywords: 'Choice · Union · Values',
                reading: "A choice might come up. Don't just pick the easier one—ask what you actually care about."
            }
        },
        {
            symbol: '🏎️',
            image: './images/tarot/06-chariot.jpg',
            zh: {
                name: '战车',
                keywords: '意志 · 前进 · 胜利',
                reading: '今天适合推进。把注意力收拢到一件事上，哪怕只做 25 分钟，也比同时开五个头强。方向对了，速度自然会上来。'
            },
            en: {
                name: 'The Chariot',
                keywords: 'Willpower · Progress · Victory',
                reading: 'A day to push forward. With direction, speed will follow.'
            }
        },
        {
            symbol: '🦁',
            image: './images/tarot/07-strength.jpg',
            zh: {
                name: '力量',
                keywords: '勇气 · 耐心 · 温柔',
                reading: '真正的力量不一定是硬扛。今天试着用更温和的方式对待自己的拖延和情绪，先接纳，再一点点往前挪。'
            },
            en: {
                name: 'Strength',
                keywords: 'Courage · Patience · Gentleness',
                reading: 'Be gentler with your procrastination and feelings—first accept, then nudge forward.'
            }
        },
        {
            symbol: '🏔️',
            image: './images/tarot/08-hermit.jpg',
            zh: {
                name: '隐士',
                keywords: '独处 · 反思 · 指引',
                reading: '今天适合关掉一些噪音。少刷一会儿，多留一点独处的时间。你会更容易听清自己真正想做的下一步。'
            },
            en: {
                name: 'The Hermit',
                keywords: 'Solitude · Reflection · Guidance',
                reading: "Turn down the noise today. You'll hear your true next step more clearly."
            }
        },
        {
            symbol: '🎡',
            image: './images/tarot/09-wheel-of-fortune.jpg',
            zh: {
                name: '命运之轮',
                keywords: '转机 · 周期 · 机遇',
                reading: '事情正在转动。可能有计划外的变化，也可能是一个小小的机会。保持开放，别因为和预期不一样就急着否定。'
            },
            en: {
                name: 'Wheel of Fortune',
                keywords: 'Turning Point · Cycles · Opportunity',
                reading: "Things are turning. Stay open—don't dismiss things just because they differ from what you expected."
            }
        },
        {
            symbol: '⭐',
            image: './images/tarot/10-star.jpg',
            zh: {
                name: '星星',
                keywords: '希望 · 疗愈 · 灵感',
                reading: '今天适合做一点让自己恢复的事。喝口水、走两步、看看窗外。灵感往往在放松之后才来，而不是在硬撑的时候。'
            },
            en: {
                name: 'The Star',
                keywords: 'Hope · Healing · Inspiration',
                reading: "Do something restorative today. Inspiration usually comes after rest, not while you're grinding."
            }
        },
        {
            symbol: '🌊',
            image: './images/tarot/11-moon.jpg',
            zh: {
                name: '月亮',
                keywords: '潜意识 · 迷雾 · 情绪',
                reading: '今天的情绪可能有点起伏，别急着下结论。给不确定留一点空间，等雾散一点再看，会比现在清楚得多。'
            },
            en: {
                name: 'The Moon',
                keywords: 'Subconscious · Mystery · Emotion',
                reading: "Your feelings may swing a bit today—don't jump to conclusions. It'll be clearer once the fog lifts."
            }
        },
        {
            symbol: '☀️',
            image: './images/tarot/12-sun.jpg',
            zh: {
                name: '太阳',
                keywords: '活力 · 成功 · 清晰',
                reading: '状态不错的一天。适合把最重要的事放在前面做，也适合把开心分享给别人。好状态值得被好好利用。'
            },
            en: {
                name: 'The Sun',
                keywords: 'Vitality · Success · Clarity',
                reading: 'A good-energy day. Put the most important thing first, and share your joy with others.'
            }
        },
        {
            symbol: '🌍',
            image: './images/tarot/13-world.jpg',
            zh: {
                name: '世界',
                keywords: '完成 · 圆满 · 旅程',
                reading: '适合收尾。把拖着没结束的小事做完，给自己一个明确的结束感。完成本身，就是最好的奖励。'
            },
            en: {
                name: 'The World',
                keywords: 'Completion · Fulfillment · Journey',
                reading: 'A day for closure. Completion itself is the reward.'
            }
        }
    ];

    function updateHero() {
        var now = new Date();
        var h = now.getHours();

        var greetKey = 'greetingMorning';
        if (h >= 12 && h < 18) greetKey = 'greetingAfternoon';
        else if (h >= 18 || h < 5) greetKey = 'greetingEvening';

        var greetEl = document.getElementById('hero-greeting');
        if (greetEl) greetEl.textContent = t(greetKey);

        var dayEl = document.getElementById('hero-day');
        var monthEl = document.getElementById('hero-month');
        if (dayEl) dayEl.textContent = now.getDate();

        if (monthEl) {
            if (lang === 'zh') {
                var zhDay = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
                monthEl.textContent = t('monthWeekTpl').replace('{m}', now.getMonth() + 1).replace('{d}', zhDay);
            } else {
                var enMonth = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
                var enDay = now.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
                monthEl.textContent = enMonth + ' · ' + enDay;
            }
        }
    }

    function calcStreak() {
        var count = 0;
        var cursor = new Date();
        if (!focusRecords.some(function(r) { return r.date === dateStr(cursor); })) {
            cursor.setDate(cursor.getDate() - 1);
        }
        while (true) {
            var ds = dateStr(cursor);
            var has = focusRecords.some(function(r) { return r.date === ds; });
            if (!has) break;
            count++;
            cursor.setDate(cursor.getDate() - 1);
            if (count > 3650) break;
        }
        return count;
    }

    function calcWeekData() {
        var arr = [];
        var weekLabelsZh = ['日', '一', '二', '三', '四', '五', '六'];
        var weekLabelsEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var labels = lang === 'en' ? weekLabelsEn : weekLabelsZh;
        for (var i = 6; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var ds = dateStr(d);
            var secs = focusRecords
                .filter(function(r) { return r.date === ds; })
                .reduce(function(s, r) { return s + recSeconds(r); }, 0);
            arr.push({ seconds: secs, isToday: i === 0, label: labels[d.getDay()] });
        }
        return arr;
    }

    function renderWeek() {
        var weekData = calcWeekData();
        var totalSec = 0;
        weekData.forEach(function(v) { totalSec += v.seconds; });

        var todayTomato = focusRecords.filter(function(r) {
            for (var i = 0; i < 7; i++) {
                var d = new Date();
                d.setDate(d.getDate() - i);
                if (r.date === dateStr(d)) return true;
            }
            return false;
        }).length;

        countUp(document.getElementById('week-streak'), calcStreak());
        var totalFmt = formatDuration(totalSec);
        countUp(document.getElementById('week-total'), totalFmt.v);
        document.getElementById('week-total-unit').textContent = t(totalFmt.unitKey);
        countUp(document.getElementById('week-tomato'), todayTomato);

        var chart = document.getElementById('week-chart');
        if (!chart) return;
        chart.innerHTML = '';
        var max = Math.max.apply(null, weekData.map(function(v) { return v.seconds; }).concat([1]));
        weekData.forEach(function(v) {
            var wrap = document.createElement('div');
            wrap.className = 'week-bar-wrap';
            var bar = document.createElement('div');
            bar.className = 'week-bar' + (v.isToday ? ' today' : '');
            bar.style.height = '0%';
            wrap.appendChild(bar);
            chart.appendChild(wrap);
            requestAnimationFrame(function() {
                bar.style.height = Math.max(6, Math.round(v.seconds / max * 100)) + '%';
            });
        });
    }

    function renderHome() {
        updateHero();

        var today = todayStr();
        var todayRecords = focusRecords.filter(function(r) { return r.date === today; });
        var todaySec = todayRecords.reduce(function(s, r) { return s + recSeconds(r); }, 0);

        countUp(document.getElementById('ov-tomatoes'), todayRecords.length);
        var fmt = formatDuration(todaySec);
        countUp(document.getElementById('ov-minutes'), fmt.v);
        document.getElementById('ov-minutes-unit').textContent = t(fmt.unitKey);

        var doneCount = todos.filter(function(x) { return x.done; }).length;
        var rate = todos.length ? Math.round(doneCount / todos.length * 100) : 0;

        countUp(document.getElementById('ov-rate'), rate);
        var fill = document.getElementById('ov-progress-fill');
        if (fill) fill.style.width = rate + '%';

        var metaEl = document.getElementById('ov-todo-meta');
        if (metaEl) {
            metaEl.textContent = t('ovTodoMetaTpl')
                .replace('{d}', doneCount).replace('{t}', todos.length);
        }

        if (dailyTarot && TAROT[dailyTarot.index]) {
            var card = TAROT[dailyTarot.index];
            var data = card[lang] || card.zh;
            var ovSym = document.getElementById('ov-tarot-symbol');
            if (ovSym) {
                ovSym.textContent = '';
                ovSym.style.backgroundImage = card.image ? "url('" + card.image + "')" : '';
            }
            document.getElementById('ov-tarot-name').textContent = data.name;
            document.getElementById('ov-tarot-key').textContent = data.keywords;
        } else {
            var ovSym2 = document.getElementById('ov-tarot-symbol');
            if (ovSym2) {
                ovSym2.textContent = '✦';
                ovSym2.style.backgroundImage = '';
            }
            document.getElementById('ov-tarot-name').textContent = t('notDrawn');
            document.getElementById('ov-tarot-key').textContent = t('tapToDraw');
        }

        renderMiniChart();
        renderWeek();
    }

    function renderMiniChart() {
        var chart = document.getElementById('ov-mini-chart');
        if (!chart) return;
        chart.innerHTML = '';
        var values = [];
        for (var i = 6; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var ds = dateStr(d);
            var secs = focusRecords
                .filter(function(r) { return r.date === ds; })
                .reduce(function(s, r) { return s + recSeconds(r); }, 0);
            values.push(secs);
        }
        var max = Math.max.apply(null, values.concat([1]));
        values.forEach(function(v) {
            var bar = document.createElement('div');
            bar.className = 'ov-mini-bar';
            bar.style.height = Math.max(8, Math.round(v / max * 100)) + '%';
            chart.appendChild(bar);
        });
    }

    function renderTodos() {
        var list = document.getElementById('todo-list');
        var empty = document.getElementById('todo-empty');
        var select = document.getElementById('todo-select');
        var currentSelectValue = select.value;

        list.innerHTML = '';
        todos.forEach(function(td) {
            var li = document.createElement('li');
            li.className = 'todo-item' + (td.done ? ' done' : '');
            li.innerHTML =
                '<button class="todo-check" data-id="' + td.id + '" aria-label="toggle">' +
                (td.done ? '✓' : '') +
                '</button>' +
                '<span class="todo-text">' + escapeHtml(td.text) + '</span>' +
                '<span class="todo-tomato">🍅' + (td.tomatoes || 0) + '</span>' +
                '<button class="todo-del" data-id="' + td.id + '" aria-label="delete">×</button>';
            list.appendChild(li);
        });
        empty.style.display = todos.length ? 'none' : 'block';

        var done = todos.filter(function(x) { return x.done; }).length;
        var rate = todos.length ? Math.round(done / todos.length * 100) : 0;
        document.getElementById('todo-progress-fill').style.width = rate + '%';
        document.getElementById('todo-progress-text').textContent = rate + '%';

        select.innerHTML = '<option value="">' + t('noLink') + '</option>';
        todos.filter(function(x) { return !x.done; }).forEach(function(x) {
            var opt = document.createElement('option');
            opt.value = x.id;
            opt.textContent = x.text;
            select.appendChild(opt);
        });
        var stillExists = Array.prototype.some.call(select.options, function(o) {
            return o.value === currentSelectValue;
        });
        select.value = stillExists ? currentSelectValue : '';

        renderStats();
        renderHome();
    }

    function addTodo() {
        var input = document.getElementById('todo-input');
        var text = input.value.trim();
        if (!text) { toast(t('pleaseEnter'));
            input.focus(); return; }
        todos.push({ id: Date.now(), text: text, done: false, tomatoes: 0 });
        input.value = '';
        saveTodos();
        renderTodos();
        toast(t('addedToast'));
    }

    document.getElementById('btn-add').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') addTodo();
    });

    document.getElementById('todo-list').addEventListener('click', function(e) {
        var check = e.target.closest('.todo-check');
        var del = e.target.closest('.todo-del');
        if (check) {
            var id = Number(check.dataset.id);
            var td = todos.find(function(x) { return x.id === id; });
            if (td) { td.done = !td.done;
                saveTodos();
                renderTodos(); }
        }
        if (del) {
            var did = Number(del.dataset.id);
            todos = todos.filter(function(x) { return x.id !== did; });
            saveTodos();
            renderTodos();
        }
    });

    /* ============ 番茄钟（内部按秒） ============ */
    var MODES = {
        focus: { seconds: durations.focus, labelKey: 'timerFocusing', color: '#E8834E' },
        short: { seconds: durations.short, labelKey: 'timerShortBreak', color: '#5BA88A' },
        long: { seconds: durations.long, labelKey: 'timerLongBreak', color: '#8B7BC7' }
    };
    var CIRCUMFERENCE = 565.49;
    var mode = 'focus';
    var totalSeconds = MODES.focus.seconds;
    var remaining = totalSeconds;
    var running = false;
    var timerId = null;
    var startBtnState = 'start';

    var displayEl = document.getElementById('timer-display');
    var labelEl = document.getElementById('timer-label');
    var ringEl = document.getElementById('ring-fg');
    var startBtn = document.getElementById('btn-start');

    function updateStartBtn() { startBtn.textContent = t(startBtnState); }

    function setStartBtn(state) { startBtnState = state;
        updateStartBtn(); }

    function updateTimerUI() {
        var m = Math.floor(remaining / 60);
        var s = remaining % 60;
        displayEl.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
        var ratio = totalSeconds > 0 ? remaining / totalSeconds : 0;
        ringEl.style.strokeDashoffset = CIRCUMFERENCE * (1 - ratio);
        ringEl.style.stroke = MODES[mode].color;
        ringEl.style.filter = 'drop-shadow(0 0 10px ' + MODES[mode].color + '88)';
        labelEl.textContent = t(MODES[mode].labelKey);
    }

    function tick() {
        remaining -= 1;
        if (remaining <= 0) {
            remaining = 0;
            updateTimerUI();
            finishTimer();
            return;
        }
        updateTimerUI();
    }

    function finishTimer() {
        clearInterval(timerId);
        timerId = null;
        running = false;
        setStartBtn('start');

        if (mode === 'focus') {
            addFocusRecord();
            playChime('focus');
            toast(t('focusDoneToast'));
        } else {
            playChime('break');
            toast(t('breakDoneToast'));
        }

        remaining = totalSeconds;
        updateTimerUI();
    }

    function addFocusRecord() {
        var select = document.getElementById('todo-select');
        var todoId = select.value ? Number(select.value) : null;
        var sec = MODES[mode].seconds;
        focusRecords.push({
            id: Date.now(),
            date: todayStr(),
            seconds: sec,
            minutes: sec / 60,
            todoId: todoId
        });
        saveRecords();
        if (todoId) {
            var td = todos.find(function(x) { return x.id === todoId; });
            if (td) { td.tomatoes = (td.tomatoes || 0) + 1;
                saveTodos(); }
        }
        renderTodos();
        renderStats();
        renderHome();
    }

    function stopAndResetTimer() {
        clearInterval(timerId);
        timerId = null;
        running = false;
        setStartBtn('start');
        totalSeconds = MODES[mode].seconds;
        remaining = totalSeconds;
        updateTimerUI();
    }

    startBtn.addEventListener('click', function() {
        unlockAudio();
        if (running) {
            clearInterval(timerId);
            timerId = null;
            running = false;
            setStartBtn('resume');
        } else {
            if (remaining <= 0) remaining = totalSeconds;
            running = true;
            setStartBtn('pause');
            timerId = setInterval(tick, 1000);
        }
    });

    document.getElementById('btn-reset').addEventListener('click', stopAndResetTimer);

    document.querySelectorAll('.mode-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            if (running) { toast(t('pauseFirstToast')); return; }
            mode = tab.dataset.mode;
            document.querySelectorAll('.mode-tab').forEach(function(tb) {
                tb.classList.toggle('active', tb === tab);
            });
            totalSeconds = MODES[mode].seconds;
            remaining = totalSeconds;
            setStartBtn('start');
            updateTimerUI();
        });
    });

    var durFocusEl = document.getElementById('dur-focus');
    var durShortEl = document.getElementById('dur-short');
    var durLongEl = document.getElementById('dur-long');

    function syncDurationInputs() {
        durFocusEl.value = durations.focus;
        durShortEl.value = durations.short;
        durLongEl.value = durations.long;
    }

    function applyDurationsToModes() {
        MODES.focus.seconds = durations.focus;
        MODES.short.seconds = durations.short;
        MODES.long.seconds = durations.long;
    }

    document.getElementById('btn-save-duration').addEventListener('click', function() {
        var f = clamp(Math.round(Number(durFocusEl.value) || DEFAULT_DURATIONS.focus), 1, 10800);
        var s = clamp(Math.round(Number(durShortEl.value) || DEFAULT_DURATIONS.short), 1, 3600);
        var l = clamp(Math.round(Number(durLongEl.value) || DEFAULT_DURATIONS.long), 1, 3600);
        durations = { focus: f, short: s, long: l };
        saveDurations();
        applyDurationsToModes();
        syncDurationInputs();
        stopAndResetTimer();
        toast(t('settingsSavedToast'));
    });

    document.getElementById('btn-reset-duration').addEventListener('click', function() {
        durations = { focus: DEFAULT_DURATIONS.focus, short: DEFAULT_DURATIONS.short, long: DEFAULT_DURATIONS.long };
        saveDurations();
        applyDurationsToModes();
        syncDurationInputs();
        stopAndResetTimer();
        toast(t('defaultsRestoredToast'));
    });

    /* ============ 塔罗 ============ */
    function hasDrawnToday() {
        return dailyTarot && dailyTarot.date === todayStr() && typeof dailyTarot.index === 'number';
    }

    function ensureDailyTarotFresh() {
        if (dailyTarot && dailyTarot.date !== todayStr()) {
            dailyTarot = null;
            localStorage.removeItem(DAILY_TAROT_KEY);
        }
    }

    function renderTarotCard(card) {
        var data = card[lang] || card.zh;
        var img = document.getElementById('tarot-img');
        if (img) {
            if (card.image) {
                img.src = card.image;
                img.alt = data.name;
            } else {
                img.removeAttribute('src');
            }
        }
        document.getElementById('tarot-keywords').textContent = data.keywords;
        document.getElementById('tarot-reading').textContent = data.reading;
    }

    function updateDrawBtn() {
        var btn = document.getElementById('btn-draw');
        var hint = document.getElementById('tarot-daily-hint');
        if (hasDrawnToday()) {
            btn.textContent = t('comeBackTomorrow');
            btn.disabled = true;
            hint.hidden = false;
            hint.textContent = t('dailyHint');
        } else {
            btn.textContent = t('drawCard');
            btn.disabled = false;
            hint.hidden = true;
        }
    }

    function syncFortunePage() {
        var cardEl = document.getElementById('tarot-card');
        var keywordsEl = document.getElementById('tarot-keywords');
        var readingEl = document.getElementById('tarot-reading');
        if (!hasDrawnToday()) {
            cardEl.classList.remove('flipped');
            updateDrawBtn();
            keywordsEl.textContent = t('readingHint');
            readingEl.textContent = '';
            return;
        }
        var card = TAROT[dailyTarot.index];
        if (!card) return;
        renderTarotCard(card);
        updateDrawBtn();
        setTimeout(function() { cardEl.classList.add('flipped'); }, 120);
    }

    var drawing = false;
    document.getElementById('btn-draw').addEventListener('click', function() {
        if (drawing) return;
        if (hasDrawnToday()) { toast(t('alreadyDrawnToast')); return; }
        drawing = true;
        var cardEl = document.getElementById('tarot-card');
        var btn = document.getElementById('btn-draw');
        var wasFlipped = cardEl.classList.contains('flipped');
        cardEl.classList.remove('flipped');
        btn.disabled = true;
        setTimeout(function() {
            var index = Math.floor(Math.random() * TAROT.length);
            var card = TAROT[index];
            dailyTarot = { date: todayStr(), index: index };
            saveDailyTarot();
            renderTarotCard(card);
            cardEl.classList.add('flipped');
            updateDrawBtn();
            drawing = false;
            renderHome();
        }, wasFlipped ? 720 : 120);
    });

    /* ============ 统计 ============ */
    function renderStats() {
        var today = todayStr();
        var todayRecords = focusRecords.filter(function(r) { return r.date === today; });
        var todaySec = todayRecords.reduce(function(s, r) { return s + recSeconds(r); }, 0);

        var fmt = formatDuration(todaySec);
        countUp(document.getElementById('stat-minutes'), fmt.v);
        document.getElementById('stat-minutes-unit').textContent = t(fmt.unitKey);

        countUp(document.getElementById('stat-tomatoes'), todayRecords.length);

        var doneCount = todos.filter(function(x) { return x.done; }).length;
        var rate = todos.length ? Math.round(doneCount / todos.length * 100) : 0;
        countUp(document.getElementById('stat-rate'), rate);

        var donut = document.getElementById('donut-rate');
        donut.style.setProperty('--p', rate);
        document.getElementById('donut-rate-text').textContent = rate + '%';

        var tc = document.getElementById('today-count');
        if (tc) tc.textContent = todayRecords.length;

        renderBarChart();
    }

    function renderBarChart() {
        var chart = document.getElementById('bar-chart');
        chart.innerHTML = '';
        var weekLabels = lang === 'en' ?
            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
            ['日', '一', '二', '三', '四', '五', '六'];
        var values = [];
        for (var i = 6; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var ds = dateStr(d);
            var secs = focusRecords
                .filter(function(r) { return r.date === ds; })
                .reduce(function(s, r) { return s + recSeconds(r); }, 0);
            values.push({ label: weekLabels[d.getDay()], seconds: secs });
        }
        var max = Math.max.apply(null, values.map(function(v) { return v.seconds; }).concat([1]));
        values.forEach(function(v) {
            var item = document.createElement('div');
            item.className = 'bar-item';
            var track = document.createElement('div');
            track.className = 'bar-track';
            var fill = document.createElement('div');
            fill.className = 'bar-fill';
            fill.style.height = '0%';
            track.appendChild(fill);
            var label = document.createElement('span');
            label.className = 'bar-label';
            label.textContent = v.label;
            item.appendChild(track);
            item.appendChild(label);
            chart.appendChild(item);
            requestAnimationFrame(function() {
                fill.style.height = (v.seconds / max * 100) + '%';
            });
        });
    }

    /* ============ 语言 ============ */
    function applyLang() {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        document.title = t('docTitle');
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var val = I18N[lang][el.dataset.i18n];
            if (val != null) el.textContent = val;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            var val = I18N[lang][el.dataset.i18nPlaceholder];
            if (val != null) el.placeholder = val;
        });
        document.getElementById('lang-toggle').textContent = t('langBtnText');
        updateStartBtn();
        updateTimerUI();
        renderTodos();
        renderStats();
        renderHome();
        syncFortunePage();
        updateSoundBtn();
    }

    document.getElementById('lang-toggle').addEventListener('click', function() {
        lang = lang === 'zh' ? 'en' : 'zh';
        localStorage.setItem(LANG_KEY, lang);
        applyLang();
        toast(lang === 'zh' ? '切换到中文' : 'Switched to English');
    });

    var soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
        soundBtn.addEventListener('click', function() {
            soundMuted = !soundMuted;
            localStorage.setItem(SOUND_KEY, soundMuted ? 'off' : 'on');
            updateSoundBtn();
            if (!soundMuted) {
                unlockAudio();
                playChime('focus');
                toast(t('soundOnToast'));
            } else {
                toast(t('soundOffToast'));
            }
        });
    }

    syncDurationInputs();
    syncFortunePage();
    applyLang();

    var activePage = document.querySelector('.page.active');
    if (activePage) applyStagger(activePage);

})();