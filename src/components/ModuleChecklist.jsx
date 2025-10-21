import React from 'react';
import Checklist from './Checklist';

const ModuleChecklist = ({ items, onComplete }) => (
  <Checklist items={items} onComplete={onComplete} />
);

export default ModuleChecklist;
