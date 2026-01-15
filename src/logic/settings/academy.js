export default {
    data() {
        return {
            academyInfo: {
                name: '스마트 학원',
                director: '김원장',
                businessNumber: '123-45-67890',
                establishedDate: '2020-03-01',
                phone: '02-1234-5678',
                fax: '02-1234-5679',
                email: 'smart@academy.com',
                website: 'https://www.smartacademy.com',
                zipCode: '06234',
                address: '서울특별시 강남구 테헤란로 123',
                addressDetail: '스마트빌딩 3층',
                operatingHours: {
                    start: '09:00',
                    end: '22:00'
                },
                closedDays: ['sunday'],
                maxCapacity: 200,
                classrooms: 10,
                bank: {
                    name: 'KB국민은행',
                    accountNumber: '1234-5678-9012',
                    accountHolder: '스마트학원'
                },
                description: '스마트 학원은 2020년에 설립된 종합 교육 학원으로, 초등학교부터 고등학교까지 다양한 과목을 전문적으로 지도하고 있습니다.\n\n우리 학원은 학생 개개인의 특성과 학습 수준을 고려한 맞춤형 교육을 제공하며, 체계적인 커리큘럼과 우수한 강사진을 통해 학업 성취도 향상에 기여하고 있습니다.',
                features: '- 소규모 반 편성으로 집중 학습 가능\n- 최신 교육 시설 및 장비 완비\n- 체계적인 성적 관리 시스템\n- 정기 학부모 상담\n- 무료 자습실 운영\n- 온라인 학습 지원',
                sns: {
                    facebook: 'https://facebook.com/smartacademy',
                    instagram: 'https://instagram.com/smartacademy',
                    youtube: 'https://youtube.com/smartacademy',
                    blog: 'https://blog.naver.com/smartacademy'
                }
            }
        };
    },

    methods: {
        searchAddress() {
            // 주소 검색 기능 (실제로는 다음 주소 API 등을 사용)
            alert('주소 검색 기능입니다.\n실제 운영 시 다음 주소 API를 연동하여 사용합니다.');

            // 예시 데이터
            this.academyInfo.zipCode = '06234';
            this.academyInfo.address = '서울특별시 강남구 테헤란로 123';
        },

        saveAcademyInfo() {
            // 유효성 검사
            if (!this.academyInfo.name.trim()) {
                alert('학원명을 입력해주세요.');
                return;
            }

            if (!this.academyInfo.director.trim()) {
                alert('원장명을 입력해주세요.');
                return;
            }

            if (!this.academyInfo.phone.trim()) {
                alert('대표 전화를 입력해주세요.');
                return;
            }

            if (!this.academyInfo.email.trim()) {
                alert('이메일을 입력해주세요.');
                return;
            }

            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.academyInfo.email)) {
                alert('올바른 이메일 형식을 입력해주세요.');
                return;
            }

            // 저장 처리
            console.log('학원 정보 저장:', this.academyInfo);

            // 실제로는 API 호출
            alert('학원 정보가 저장되었습니다.');
        },

        getClosedDaysText() {
            const dayMap = {
                'monday': '월요일',
                'tuesday': '화요일',
                'wednesday': '수요일',
                'thursday': '목요일',
                'friday': '금요일',
                'saturday': '토요일',
                'sunday': '일요일'
            };

            if (this.academyInfo.closedDays.length === 0) {
                return '없음';
            }

            return this.academyInfo.closedDays.map(day => dayMap[day]).join(', ');
        }
    },

    mounted() {
        console.log('학원 정보 페이지 로드됨');
    }
};
