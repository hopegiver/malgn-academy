export default {
    data() {
        return {
            selectedWeek: 'current',

            // 요일
            weekDays: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],

            // 시간대
            timeSlots: [
                { slot: 1, label: '09:00-10:00' },
                { slot: 2, label: '10:00-11:00' },
                { slot: 3, label: '11:00-12:00' },
                { slot: 4, label: '13:00-14:00' },
                { slot: 5, label: '14:00-15:00' },
                { slot: 6, label: '15:00-16:00' },
                { slot: 7, label: '16:00-17:00' },
                { slot: 8, label: '17:00-18:00' },
                { slot: 9, label: '18:00-19:00' },
                { slot: 10, label: '19:00-20:00' },
                { slot: 11, label: '20:00-21:00' }
            ],

            // 통계
            stats: {
                totalClasses: 28,
                todayClasses: 6,
                rooms: 5,
                teachers: 8
            },

            // 시간표 데이터
            scheduleData: [
                // 월요일
                {
                    id: 1,
                    day: '월요일',
                    slot: 9,
                    name: '고등수학 심화반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '301호',
                    students: 15
                },
                {
                    id: 2,
                    day: '월요일',
                    slot: 10,
                    name: '고등물리 심화반',
                    subject: 'science',
                    teacher: '최선생',
                    room: '401호',
                    students: 10
                },
                // 화요일
                {
                    id: 3,
                    day: '화요일',
                    slot: 8,
                    name: '중등영어 기초반',
                    subject: 'english',
                    teacher: '이선생',
                    room: '201호',
                    students: 12
                },
                {
                    id: 4,
                    day: '화요일',
                    slot: 9,
                    name: '중등수학 중급반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '301호',
                    students: 18
                },
                // 수요일
                {
                    id: 5,
                    day: '수요일',
                    slot: 9,
                    name: '고등수학 심화반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '301호',
                    students: 15
                },
                {
                    id: 6,
                    day: '수요일',
                    slot: 9,
                    name: '고등국어 심화반',
                    subject: 'korean',
                    teacher: '정선생',
                    room: '501호',
                    students: 14
                },
                {
                    id: 7,
                    day: '수요일',
                    slot: 10,
                    name: '고등물리 심화반',
                    subject: 'science',
                    teacher: '최선생',
                    room: '401호',
                    students: 10
                },
                // 목요일
                {
                    id: 8,
                    day: '목요일',
                    slot: 8,
                    name: '중등영어 기초반',
                    subject: 'english',
                    teacher: '이선생',
                    room: '201호',
                    students: 12
                },
                {
                    id: 9,
                    day: '목요일',
                    slot: 9,
                    name: '중등수학 중급반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '301호',
                    students: 18
                },
                // 금요일
                {
                    id: 10,
                    day: '금요일',
                    slot: 9,
                    name: '고등수학 심화반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '301호',
                    students: 15
                },
                {
                    id: 11,
                    day: '금요일',
                    slot: 9,
                    name: '고등국어 심화반',
                    subject: 'korean',
                    teacher: '정선생',
                    room: '501호',
                    students: 14
                },
                {
                    id: 12,
                    day: '금요일',
                    slot: 9,
                    name: '중등수학 중급반',
                    subject: 'math',
                    teacher: '박선생',
                    room: '302호',
                    students: 16
                },
                // 토요일
                {
                    id: 13,
                    day: '토요일',
                    slot: 4,
                    name: '초등수학 기초반',
                    subject: 'math',
                    teacher: '김선생',
                    room: '201호',
                    students: 10
                },
                {
                    id: 14,
                    day: '토요일',
                    slot: 5,
                    name: '초등영어 기초반',
                    subject: 'english',
                    teacher: '이선생',
                    room: '202호',
                    students: 8
                }
            ]
        };
    },

    mounted() {
        this.loadSchedule();
    },

    methods: {
        // 시간표 로드
        async loadSchedule() {
            // 실제로는 API 호출
            // const response = await this.$api.get(`/api/schedule?week=${this.selectedWeek}`);
            // this.scheduleData = response.data;

            console.log('시간표 로드:', this.selectedWeek);
        },

        // 특정 요일/시간의 수업 가져오기
        getClassesForSlot(day, slot) {
            return this.scheduleData.filter(cls => cls.day === day && cls.slot === slot);
        },

        // 과목별 클래스 반환
        getClassTypeClass(subject) {
            const classMap = {
                math: 'schedule-math',
                english: 'schedule-english',
                science: 'schedule-science',
                korean: 'schedule-korean'
            };
            return classMap[subject] || 'schedule-default';
        },

        // 수업 상세보기
        viewClassDetail(cls) {
            // 수업 상세 정보 모달 표시 또는 페이지 이동
            alert(`${cls.name}\n강사: ${cls.teacher}\n강의실: ${cls.room}\n수강생: ${cls.students}명`);
        }
    }
};
