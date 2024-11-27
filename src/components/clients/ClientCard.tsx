import React from 'react';
import { Client } from '../../types/client';
import { Building2, Wallet, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface ClientCardProps {
  client: Client;
  onContextMenu: (e: React.MouseEvent, client: Client) => void;
  onClientClick: (client: Client) => void;
  onToggleVisibility: (client: Client) => void;
  type: 'building' | 'deposit' | 'built';
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onContextMenu,
  onClientClick,
  onToggleVisibility,
  type
}) => {
  const getStatusIcon = () => {
    switch (type) {
      case 'building':
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'deposit':
        return <Wallet className="w-4 h-4 text-amber-600" />;
      case 'built':
        return <CheckCircle2 className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColors = () => {
    switch (type) {
      case 'building':
        return 'border-emerald-500 bg-emerald-100';
      case 'deposit':
        return 'border-amber-500 bg-amber-100';
      case 'built':
        return 'border-blue-500 bg-blue-100';
    }
  };

  return (
    <div
      className={`
        bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 cursor-pointer
        border-l-4 mb-2 ${getStatusColors()}
      `}
      onContextMenu={(e) => onContextMenu(e, client)}
      onClick={() => onClientClick(client)}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              type === 'building' ? 'bg-emerald-100' : 
              type === 'deposit' ? 'bg-amber-100' : 
              'bg-blue-100'
            }`}>
              {getStatusIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 text-sm">
                  {client.lastName} {client.firstName}
                </h3>
                <span className="text-xs text-gray-500">
                  {client.clientNumber}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">
                  {client.phone}
                </span>
                <span className="text-xs text-gray-400">
                  {client.constructionAddress}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(client);
            }}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            title={client.isIconsVisible ? 'Скрыть иконки' : 'Показать иконки'}
          >
            {client.isIconsVisible ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};