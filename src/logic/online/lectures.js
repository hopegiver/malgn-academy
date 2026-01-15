export default {
    data() {
        return {
            searchKeyword: '',
            filterCategory: '',
            filterStatus: '',
            showCreateModal: false,
            currentLecture: {
                id: null,
                title: '',
                category: '',
                instructor: '',
                duration: '',
                status: '준비중',
                description: '',
                lessons: []
            },
            // 레슨 관리
            showLessonModal: false,
            currentLesson: {
                id: null,
                title: '',
                duration: 0,
                videoUrl: '',
                videoType: 'youtube', // 'upload', 'youtube', 'vimeo'
                order: 1
            },
            stats: {
                totalLectures: 24,
                publicLectures: 18,
                totalStudents: 156,
                avgProgress: 68
            },
            lectures: [
                {
                    id: 1,
                    title: '중등 수학 기초 완성',
                    category: '수학',
                    instructor: '김철수',
                    students: 32,
                    duration: '60분',
                    createdDate: '2024-01-15',
                    status: '공개',
                    description: '중등 수학의 기초를 다지는 강의입니다.',
                    lessons: [
                        { id: 1, title: '강의 소개', duration: 25, videoUrl: 'https://www.youtube.com/watch?v=example1', videoType: 'youtube', order: 1 },
                        { id: 2, title: '기본 개념 이해', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=example2', videoType: 'youtube', order: 2 },
                        { id: 3, title: '실습 문제 풀이', duration: 30, videoUrl: 'https://vimeo.com/example3', videoType: 'vimeo', order: 3 },
                        { id: 4, title: '심화 학습', duration: 50, videoUrl: '', videoType: 'upload', order: 4 },
                        { id: 5, title: '종합 정리', duration: 40, videoUrl: 'https://www.youtube.com/watch?v=example5', videoType: 'youtube', order: 5 }
                    ]
                },
                {
                    id: 2,
                    title: '고등 영문법 정복',
                    category: '영어',
                    instructor: '이영희',
                    students: 28,
                    duration: '90분',
                    createdDate: '2024-01-14',
                    status: '공개',
                    description: '고등 영문법을 완벽하게 정복합니다.',
                    lessons: [
                        { id: 1, title: '시제의 이해', duration: 60, videoUrl: 'https://www.youtube.com/watch?v=english1', videoType: 'youtube', order: 1 },
                        { id: 2, title: '조동사 완벽 정복', duration: 55, videoUrl: 'https://www.youtube.com/watch?v=english2', videoType: 'youtube', order: 2 },
                        { id: 3, title: '가정법 마스터', duration: 50, videoUrl: 'https://vimeo.com/english3', videoType: 'vimeo', order: 3 }
                    ]
                },
                {
                    id: 3,
                    title: '물리학 입문',
                    category: '과학',
                    instructor: '박민수',
                    students: 25,
                    duration: '75분',
                    createdDate: '2024-01-13',
                    status: '공개',
                    description: '물리학의 기초 개념을 학습합니다.',
                    lessons: [
                        { id: 1, title: '물리학이란?', duration: 30, videoUrl: 'https://www.youtube.com/watch?v=physics1', videoType: 'youtube', order: 1 },
                        { id: 2, title: '뉴턴의 운동 법칙', duration: 45, videoUrl: 'https://www.youtube.com/watch?v=physics2', videoType: 'youtube', order: 2 },
                        { id: 3, title: '에너지와 일', duration: 40, videoUrl: 'https://vimeo.com/physics3', videoType: 'vimeo', order: 3 },
                        { id: 4, title: '운동량 보존', duration: 35, videoUrl: '', videoType: 'upload', order: 4 }
                    ]
                },
                {
                    id: 4,
                    title: '국어 독해 전략',
                    category: '국어',
                    instructor: '최유진',
                    students: 30,
                    duration: '60분',
                    createdDate: '2024-01-12',
                    status: '공개',
                    description: '국어 독해 능력을 향상시키는 전략을 배웁니다.',
                    lessons: []
                },
                {
                    id: 5,
                    title: '미적분 심화',
                    category: '수학',
                    instructor: '김철수',
                    students: 18,
                    duration: '120분',
                    createdDate: '2024-01-11',
                    status: '비공개',
                    description: '미적분 심화 과정입니다.',
                    lessons: []
                },
                {
                    id: 6,
                    title: '화학 실험 기초',
                    category: '과학',
                    instructor: '박민수',
                    students: 23,
                    duration: '90분',
                    createdDate: '2024-01-10',
                    status: '준비중',
                    description: '화학 실험의 기초를 배웁니다.',
                    lessons: []
                }
            ]
        };
    },
    computed: {
        filteredLectures() {
            return this.lectures.filter(lecture => {
                const matchKeyword = lecture.title.includes(this.searchKeyword) ||
                                    lecture.instructor.includes(this.searchKeyword);
                const matchCategory = !this.filterCategory || lecture.category === this.filterCategory;
                const matchStatus = !this.filterStatus || lecture.status === this.filterStatus;
                return matchKeyword && matchCategory && matchStatus;
            });
        }
    },
    methods: {
        editLecture(lecture) {
            this.currentLecture = { ...lecture };
            this.showCreateModal = true;
        },
        deleteLecture(id) {
            if (confirm('정말 삭제하시겠습니까?')) {
                this.lectures = this.lectures.filter(l => l.id !== id);
                alert('삭제되었습니다.');
            }
        },
        saveLecture() {
            if (!this.currentLecture.title || !this.currentLecture.category || !this.currentLecture.instructor) {
                alert('필수 항목을 입력해주세요.');
                return;
            }

            if (this.currentLecture.id) {
                // 수정
                const index = this.lectures.findIndex(l => l.id === this.currentLecture.id);
                if (index !== -1) {
                    this.lectures[index] = { ...this.currentLecture };
                }
                alert('수정되었습니다.');
            } else {
                // 등록
                this.currentLecture.id = Date.now();
                this.currentLecture.createdDate = new Date().toISOString().split('T')[0];
                this.currentLecture.students = 0;
                this.lectures.unshift({ ...this.currentLecture });
                alert('등록되었습니다.');
            }

            this.showCreateModal = false;
            this.resetForm();
        },
        resetForm() {
            this.currentLecture = {
                id: null,
                title: '',
                category: '',
                instructor: '',
                duration: '',
                status: '준비중',
                description: '',
                lessons: []
            };
        },
        // 레슨 추가
        addLesson() {
            this.currentLesson = {
                id: null,
                title: '',
                duration: 0,
                videoUrl: '',
                videoType: 'youtube',
                order: this.currentLecture.lessons.length + 1
            };
            this.showLessonModal = true;
        },
        // 레슨 수정
        editLesson(lesson) {
            this.currentLesson = { ...lesson };
            this.showLessonModal = true;
        },
        // 레슨 저장
        saveLesson() {
            if (!this.currentLesson.title) {
                alert('레슨 제목을 입력해주세요.');
                return;
            }

            if (this.currentLesson.id) {
                // 수정
                const index = this.currentLecture.lessons.findIndex(l => l.id === this.currentLesson.id);
                if (index !== -1) {
                    this.currentLecture.lessons[index] = { ...this.currentLesson };
                }
            } else {
                // 추가
                this.currentLesson.id = Date.now();
                this.currentLecture.lessons.push({ ...this.currentLesson });
            }

            this.showLessonModal = false;
            this.resetLessonForm();
        },
        // 레슨 삭제
        deleteLesson(lessonId) {
            if (!confirm('이 레슨을 삭제하시겠습니까?')) {
                return;
            }
            this.currentLecture.lessons = this.currentLecture.lessons.filter(l => l.id !== lessonId);
            // 순서 재정렬
            this.currentLecture.lessons.forEach((lesson, index) => {
                lesson.order = index + 1;
            });
        },
        // 레슨 순서 변경
        moveLessonUp(index) {
            if (index === 0) return;
            const lessons = this.currentLecture.lessons;
            [lessons[index], lessons[index - 1]] = [lessons[index - 1], lessons[index]];
            // 순서 재정렬
            lessons.forEach((lesson, idx) => {
                lesson.order = idx + 1;
            });
        },
        moveLessonDown(index) {
            const lessons = this.currentLecture.lessons;
            if (index === lessons.length - 1) return;
            [lessons[index], lessons[index + 1]] = [lessons[index + 1], lessons[index]];
            // 순서 재정렬
            lessons.forEach((lesson, idx) => {
                lesson.order = idx + 1;
            });
        },
        // 레슨 폼 초기화
        resetLessonForm() {
            this.currentLesson = {
                id: null,
                title: '',
                duration: 0,
                videoUrl: '',
                videoType: 'youtube',
                order: 1
            };
        }
    }
};
