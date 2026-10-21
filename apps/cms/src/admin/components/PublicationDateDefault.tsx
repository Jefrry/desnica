import { useEffect, useRef } from 'react';
import { unstable_useContentManagerContext as useContentManagerContext, useForm } from '@strapi/strapi/admin';
import { today } from '../../utils/publicationDate';

export function PublicationDateDefault() {
  const { model, id, isLoading } = useContentManagerContext();
  const onChange = useForm('PublicationDateDefault', state => state.onChange);
  const value = useForm('PublicationDateDefault', state =>
    'publicationDate' in state.values ? state.values.publicationDate : undefined,
  );
  const initialized = useRef(false);

  useEffect(() => {
    // Strapi 5 normalizes the create route's document id to undefined.
    if (model !== 'api::news.news' || id) {
      initialized.current = false;
      return;
    }
    if (isLoading || initialized.current) return;
    initialized.current = true;
    if (value === undefined || value === null || value === '') {
      onChange('publicationDate', today());
    }
  }, [model, id, isLoading, value, onChange]);

  return null;
}
