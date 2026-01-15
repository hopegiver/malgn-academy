export default {
    data() {
        return {
            searchKeyword: '',
            filters: { position: '', status: '' },
            stats: { total: 15, teachers: 8, admins: 3, staff: 4 },
            staffList: [
                {
                    id: 1, name: '박선생', position: 'teacher', phone: '010-1111-2222', email: 'park@academy.com',
                    subject: '수학', hireDate: '2020-03-01', status: 'active',
                    username: 'teacher1', lastLogin: '2026-01-15 10:15',
                    permissions: { students: true, courses: true, payment: false, attendance: true, grades: true, reports: false }
                },
                {
                    id: 2, name: '이선생', position: 'teacher', phone: '010-2222-3333', email: 'lee@academy.com',
                    subject: '영어', hireDate: '2019-09-01', status: 'active',
                    username: 'teacher2', lastLogin: '2026-01-15 13:20',
                    permissions: { students: true, courses: true, payment: false, attendance: true, grades: true, reports: false }
                },
                {
                    id: 3, name: '최선생', position: 'teacher', phone: '010-3333-4444', email: 'choi@academy.com',
                    subject: '과학', hireDate: '2021-03-01', status: 'active',
                    username: 'teacher3', lastLogin: '2026-01-14 18:30',
                    permissions: { students: true, courses: true, payment: false, attendance: true, grades: true, reports: false }
                },
                {
                    id: 4, name: '김관리자', position: 'admin', phone: '010-4444-5555', email: 'admin@academy.com',
                    subject: '', hireDate: '2018-01-01', status: 'active',
                    username: 'admin', lastLogin: '2026-01-15 14:30',
                    permissions: { students: true, courses: true, payment: true, attendance: true, grades: true, reports: true }
                },
                {
                    id: 5, name: '홍직원', position: 'staff', phone: '010-5555-6666', email: 'hong@academy.com',
                    subject: '', hireDate: '2022-06-01', status: 'active',
                    username: 'staff1', lastLogin: '2026-01-15 09:00',
                    permissions: { students: true, courses: false, payment: true, attendance: true, grades: false, reports: false }
                }
            ],
            showStaffModal: false,
            showPermissionModal: false,
            staffForm: {
                id: null,
                name: '',
                position: 'staff',
                phone: '',
                email: '',
                subject: '',
                hireDate: new Date().toISOString().split('T')[0],
                status: 'active',
                username: '',
                password: '',
                passwordConfirm: ''
            },
            selectedStaff: null,
            permissionForm: {
                students: false,
                courses: false,
                payment: false,
                attendance: false,
                grades: false,
                reports: false
            }
        };
    },
    computed: {
        filteredStaff() {
            let filtered = this.staffList;
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(s => s.name.toLowerCase().includes(keyword) || s.phone.includes(keyword));
            }
            if (this.filters.position) {
                filtered = filtered.filter(s => s.position === this.filters.position);
            }
            if (this.filters.status) {
                filtered = filtered.filter(s => s.status === this.filters.status);
            }
            return filtered;
        }
    },
    methods: {
        resetFilters() {
            this.searchKeyword = '';
            this.filters = { position: '', status: '' };
        },
        showStaffForm(staff) {
            if (staff) {
                // 수정 모드
                this.staffForm = {
                    id: staff.id,
                    name: staff.name,
                    position: staff.position,
                    phone: staff.phone,
                    email: staff.email,
                    subject: staff.subject || '',
                    hireDate: staff.hireDate,
                    status: staff.status,
                    username: staff.username,
                    password: '',
                    passwordConfirm: ''
                };
            } else {
                // 등록 모드
                this.staffForm = {
                    id: null,
                    name: '',
                    position: 'staff',
                    phone: '',
                    email: '',
                    subject: '',
                    hireDate: new Date().toISOString().split('T')[0],
                    status: 'active',
                    username: '',
                    password: '',
                    passwordConfirm: ''
                };
            }
            this.showStaffModal = true;
        },
        saveStaff() {
            // 유효성 검사
            if (!this.staffForm.name.trim()) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (!this.staffForm.username.trim()) {
                alert('아이디를 입력해주세요.');
                return;
            }
            if (!this.staffForm.id && !this.staffForm.password) {
                alert('비밀번호를 입력해주세요.');
                return;
            }
            if (!this.staffForm.id && this.staffForm.password !== this.staffForm.passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!this.staffForm.phone.trim()) {
                alert('연락처를 입력해주세요.');
                return;
            }
            if (!this.staffForm.email.trim()) {
                alert('이메일을 입력해주세요.');
                return;
            }

            // 아이디 중복 체크
            if (!this.staffForm.id) {
                if (this.staffList.some(s => s.username === this.staffForm.username)) {
                    alert('이미 사용 중인 아이디입니다.');
                    return;
                }
            }

            if (this.staffForm.id) {
                // 수정
                const index = this.staffList.findIndex(s => s.id === this.staffForm.id);
                if (index !== -1) {
                    this.staffList[index] = {
                        ...this.staffList[index],
                        name: this.staffForm.name,
                        position: this.staffForm.position,
                        phone: this.staffForm.phone,
                        email: this.staffForm.email,
                        subject: this.staffForm.subject,
                        hireDate: this.staffForm.hireDate,
                        status: this.staffForm.status,
                        username: this.staffForm.username
                    };
                }
                alert('직원 정보가 수정되었습니다.');
            } else {
                // 등록
                const newStaff = {
                    id: this.staffList.length + 1,
                    name: this.staffForm.name,
                    position: this.staffForm.position,
                    phone: this.staffForm.phone,
                    email: this.staffForm.email,
                    subject: this.staffForm.subject,
                    hireDate: this.staffForm.hireDate,
                    status: this.staffForm.status,
                    username: this.staffForm.username,
                    lastLogin: '-',
                    permissions: { students: false, courses: false, payment: false, attendance: false, grades: false, reports: false }
                };
                this.staffList.unshift(newStaff);
                alert('직원이 등록되었습니다.');
            }

            this.showStaffModal = false;
        },
        deleteStaff(staff) {
            if (staff.position === 'admin') {
                alert('관리자 계정은 삭제할 수 없습니다.');
                return;
            }
            if (confirm(`${staff.name} 직원을 삭제하시겠습니까?`)) {
                const index = this.staffList.findIndex(s => s.id === staff.id);
                if (index !== -1) {
                    this.staffList.splice(index, 1);
                    alert('직원이 삭제되었습니다.');
                }
            }
        },
        openPermissions(staff) {
            this.selectedStaff = staff;
            this.permissionForm = { ...staff.permissions };
            this.showPermissionModal = true;
        },
        savePermissions() {
            if (this.selectedStaff) {
                const index = this.staffList.findIndex(s => s.id === this.selectedStaff.id);
                if (index !== -1) {
                    this.staffList[index].permissions = { ...this.permissionForm };
                }
                alert('권한이 저장되었습니다.');
            }
            this.showPermissionModal = false;
            this.selectedStaff = null;
        },
        getPositionText(position) {
            const positions = { teacher: '강사', admin: '관리자', staff: '직원' };
            return positions[position] || position;
        },
        getPositionBadgeClass(position) {
            const classes = { teacher: 'bg-primary', admin: 'bg-success', staff: 'bg-secondary' };
            return classes[position] || 'bg-secondary';
        }
    }
};
