import type { TeamMember } from '~/types/team/team'

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    assetId: 'team-lead',
    alt: 'Руководитель Ресурсного центра',
    role: 'Руководитель Ресурсного центра',
  },
  {
    assetId: 'team-expert',
    alt: 'Эксперт по доступности',
    role: 'Эксперт по доступности',
  },
  {
    assetId: 'team-coordinator',
    alt: 'Координатор программ',
    role: 'Координатор программ',
  },
]
