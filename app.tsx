import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { RequireRole, RoleHomeRedirect } from '@/components/layout/require-role'
import { AuthProvider } from '@/contexts/auth-context'
import { HealthDataProvider } from '@/contexts/health-data-context'
import { AdminDashboardPage } from '@/pages/admin-dashboard-page'
import { AppointmentsPage } from '@/pages/appointments-page'
import { DoctorDashboardPage } from '@/pages/doctor-dashboard-page'
import { DoctorProfilePage } from '@/pages/doctor-profile-page'
import { HealthMonitoringPage } from '@/pages/health-monitoring-page'
import { LandingPage } from '@/pages/landing-page'
import { LoginPage } from '@/pages/login-page'
import { MedicalRecordsPage } from '@/pages/medical-records-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { NotificationsPage } from '@/pages/notifications-page'
import { PatientDashboardPage } from '@/pages/patient-dashboard-page'
import { PatientProfilePage } from '@/pages/patient-profile-page'
import { PrescriptionsPage } from '@/pages/prescriptions-page'
import { RegisterPage } from '@/pages/register-page'
import { SettingsPage } from '@/pages/settings-page'
import { UploadReportsPage } from '@/pages/upload-reports-page'

export function App() {
  return (
    <AuthProvider>
      <HealthDataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/app"
              element={
                <RequireRole>
                  <AppShell />
                </RequireRole>
              }
            >
              <Route index element={<RoleHomeRedirect />} />
              <Route path="admin" element={<RequireRole roles={['admin']}><AdminDashboardPage /></RequireRole>} />
              <Route path="doctor" element={<RequireRole roles={['doctor']}><DoctorDashboardPage /></RequireRole>} />
              <Route path="patient" element={<RequireRole roles={['patient']}><PatientDashboardPage /></RequireRole>} />
              <Route path="profile/patient" element={<RequireRole roles={['patient']}><PatientProfilePage /></RequireRole>} />
              <Route path="profile/doctor" element={<RequireRole roles={['doctor']}><DoctorProfilePage /></RequireRole>} />
              <Route path="monitoring" element={<RequireRole roles={['doctor', 'patient']}><HealthMonitoringPage /></RequireRole>} />
              <Route path="records" element={<MedicalRecordsPage />} />
              <Route path="reports/upload" element={<RequireRole roles={['doctor', 'patient']}><UploadReportsPage /></RequireRole>} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="prescriptions" element={<RequireRole roles={['doctor', 'patient']}><PrescriptionsPage /></RequireRole>} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HealthDataProvider>
    </AuthProvider>
  )
}
