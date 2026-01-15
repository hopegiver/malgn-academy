export default {
    data() {
        return {
            // 수정 모드 여부
            isEditMode: false,
            studentId: null,

            // 폼 데이터
            formData: {
                name: '',
                birthDate: '',
                gender: '',
                phone: '',
                school: '',
                grade: '',
                parentName: '',
                parentRelation: '',
                parentPhone: '',
                parentEmail: '',
                address: '',
                addressDetail: '',
                memo: '',
                status: 'active'
            }
        };
    },

    mounted() {
        // URL에서 학생 ID 가져오기 (수정 모드)
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const studentId = urlParams.get('id');

        if (studentId) {
            this.isEditMode = true;
            this.studentId = studentId;
            this.loadStudentData(studentId);
        }
    },

    methods: {
        // 학생 정보 로드 (수정 모드)
        async loadStudentData(studentId) {
            // 실제로는 API 호출
            // const response = await this.$api.get(`/api/students/${studentId}`);
            // this.formData = response.data;

            // 샘플 데이터
            this.formData = {
                name: '김철수',
                birthDate: '2007-05-15',
                gender: 'male',
                phone: '010-1234-5678',
                school: '서울고등학교',
                grade: 'high-2',
                parentName: '김영희',
                parentRelation: 'mother',
                parentPhone: '010-9876-5432',
                parentEmail: 'parent@example.com',
                address: '서울시 강남구 테헤란로 123',
                addressDetail: '아발론빌딩 5층',
                memo: '수학에 관심이 많음',
                status: 'active'
            };

            console.log('학생 정보 로드:', studentId);
        },

        // 폼 제출
        async handleSubmit() {
            // 유효성 검사
            if (!this.validateForm()) {
                return;
            }

            try {
                if (this.isEditMode) {
                    // 수정
                    // await this.$api.put(`/api/students/${this.studentId}`, this.formData);
                    alert('학생 정보가 수정되었습니다.');
                    console.log('학생 정보 수정:', this.formData);
                } else {
                    // 등록
                    // await this.$api.post('/api/students', this.formData);
                    alert('학생이 등록되었습니다.');
                    console.log('학생 등록:', this.formData);
                }

                // 목록으로 이동
                window.location.hash = '#/students/list';
            } catch (error) {
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                console.error(error);
            }
        },

        // 폼 유효성 검사
        validateForm() {
            if (!this.formData.name) {
                alert('학생명을 입력해주세요.');
                return false;
            }

            if (!this.formData.birthDate) {
                alert('생년월일을 입력해주세요.');
                return false;
            }

            if (!this.formData.gender) {
                alert('성별을 선택해주세요.');
                return false;
            }

            if (!this.formData.phone) {
                alert('연락처를 입력해주세요.');
                return false;
            }

            if (!this.formData.school) {
                alert('학교명을 입력해주세요.');
                return false;
            }

            if (!this.formData.grade) {
                alert('학년을 선택해주세요.');
                return false;
            }

            if (!this.formData.parentName) {
                alert('학부모명을 입력해주세요.');
                return false;
            }

            if (!this.formData.parentRelation) {
                alert('관계를 선택해주세요.');
                return false;
            }

            if (!this.formData.parentPhone) {
                alert('학부모 연락처를 입력해주세요.');
                return false;
            }

            return true;
        }
    }
};
