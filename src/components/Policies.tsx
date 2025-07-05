import React from 'react';

const policies = [
  {
    name: 'Group health insurance',
    insurer: 'Care Health Insurance',
    sumInsured: '₹ 3L, ₹ 5L, ₹ 10L',
    validTill: '10/12/2021',
    policyId: 'LPP-ABC123',
    employees: '12,000',
    dependents: '2,000',
    status: 'Active',
    logo: 'https://static.loophealth.com/care-logo.png',
  },
  {
    name: 'Accidental insurance',
    insurer: 'Aditya Birla Sun Life Insurance',
    sumInsured: '₹ 3L, ₹ 5L, ₹ 10L',
    validTill: '10/12/2021',
    policyId: 'LPP-ABC123',
    employees: '12,000',
    dependents: '2,000',
    status: 'Active',
    logo: 'https://static.loophealth.com/birla-logo.png',
  },
  {
    name: 'Term life insurance',
    insurer: 'Bharti AXA General Insurance',
    sumInsured: '₹ 3L, ₹ 5L, ₹ 10L',
    validTill: '10/12/2021',
    policyId: 'LPP-ABC123',
    employees: '12,000',
    dependents: '2,000',
    status: 'Active',
    logo: 'https://static.loophealth.com/bharti-logo.png',
  },
];

const Policies: React.FC = () => (
  <div className="min-h-screen" style={{ background: '#f8fafc' }}>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="heading-xl mb-8">Policies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {policies.map((policy, idx) => (
          <div key={idx} className="card flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-lg flex items-center justify-center bg-white border border-gray-100 shadow-sm mb-4 md:mb-0">
              <img src={policy.logo} alt={policy.name + ' logo'} className="w-12 h-12 object-contain" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-accent bg-opacity-10 text-accent text-xs font-semibold px-3 py-1 rounded-full">{policy.status}</span>
                <span className="text-lg font-bold text-gray-900">{policy.name}</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">{policy.insurer}</div>
              <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-700">
                <div>
                  <span className="block text-xs text-muted">Sum Insured</span>
                  <span className="font-medium">{policy.sumInsured}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted">Valid till</span>
                  <span className="font-medium">{policy.validTill}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted">Policy Ref ID</span>
                  <span className="font-medium">{policy.policyId}</span>
                </div>
              </div>
              <div className="flex gap-8 border-t border-gray-100 pt-4 mt-2 text-sm">
                <div>
                  <span className="block text-xs text-muted">Employees</span>
                  <span className="font-bold text-gray-900">{policy.employees}</span>
                </div>
                <div>
                  <span className="block text-xs text-muted">Dependents</span>
                  <span className="font-bold text-gray-900">{policy.dependents}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Policies; 