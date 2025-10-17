"use client";

import { useState, useMemo } from "react";
import { Customer } from "@/lib/types/customers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MapPin, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toast } from "sonner";
import EditCustomerModal from "@/components/shared/customers/customer-modal-edit";
import CreateAddressModal from "@/components/shared/customers/customer-modal-adresses";
import EditAddressModal from "@/components/shared/customers/customer-modal-adresses-edit";
import { CustomerAddress } from "@/lib/types/customers";

interface CustomersTableProps {
  customers: Customer[];
  searchTerm: string;
  onCustomerUpdated: () => void;
}

export default function CustomersTable({
  customers,
  searchTerm,
  onCustomerUpdated,
}: CustomersTableProps) {
  const [deletingCustomer, setDeletingCustomer] = useState<number | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedCustomerForAddress, setSelectedCustomerForAddress] = useState<Customer | null>(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<CustomerAddress | null>(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.cellphone.includes(searchTerm);

      return matchesSearch;
    });
  }, [customers, searchTerm]);

  const getCustomerInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getPrimaryAddress = (customer: Customer) => {
    if (customer.addresses && customer.addresses.length > 0) {
      const address = customer.addresses[0];
      if (address.neighborhood && address.street) {
        return `${address.neighborhood}, ${address.street}`;
      }
      
      if (address.street) {
        return address.street;
      }
      
      if (address.neighborhood) {
        return address.neighborhood;
      }
    }
    
    return "Endereço não cadastrado";
  };

  const getPrimaryCep = (customer: Customer) => {
    if (customer.addresses && customer.addresses.length > 0) {
      const address = customer.addresses[0];
      if (address.postal_code) {
        return address.postal_code;
      }
    }
    
    return "Não cadastrado";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return phone;
  };

  const formatCep = (cep: string) => {
    const cleaned = cep.replace(/\D/g, "");
    if (cleaned.length === 8) {
      return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    return cep;
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleToggleAddresses = (customerId: number) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  const handleAddAddress = (customer: Customer) => {
    setSelectedCustomerForAddress(customer);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
    setSelectedCustomerForAddress(null);
  };

  const handleEditAddress = (address: CustomerAddress, customer: Customer) => {
    // Adicionar customer_id se não existir
    const addressWithCustomerId = {
      ...address,
      customer_id: address.customer_id || customer.id
    };
    setSelectedAddress(addressWithCustomerId);
    setSelectedCustomerForAddress(customer);
    setIsEditAddressModalOpen(true);
  };

  const handleCloseEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
    setSelectedAddress(null);
    setSelectedCustomerForAddress(null);
  };

  const handleDeleteAddress = async (addressId: number, customerId: number) => {
    if (!confirm("Tem certeza que deseja excluir este endereço?")) {
      return;
    }

    setDeletingAddress(addressId);

    try {
      const response = await fetch(`/api/customers/${customerId}/addresses/${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir endereço");
      }

      toast.success("Endereço excluído com sucesso!");
      onCustomerUpdated();
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Erro ao excluir endereço");
    } finally {
      setDeletingAddress(null);
    }
  };

  const handleDeleteCustomer = async (customerId: number) => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) {
      return;
    }

    setDeletingCustomer(customerId);

    try {
      const response = await fetch(`/api/customers/${customerId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }

      toast.success("Cliente excluído com sucesso!");
      onCustomerUpdated();
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Erro ao excluir cliente");
    } finally {
      setDeletingCustomer(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-center font-medium text-gray-700">
                Cliente
              </TableHead>
              <TableHead className="text-center font-medium text-gray-700">
                Localização
              </TableHead>
              <TableHead className="text-center font-medium text-gray-700">
                CEP
              </TableHead>
              <TableHead className="text-center font-medium text-gray-700">
                Telefone
              </TableHead>
              <TableHead className="text-center font-medium text-gray-700">
                Data Cadastro
              </TableHead>
              <TableHead className="text-center font-medium text-gray-700">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <>
                {/* Linha principal do cliente */}
                <TableRow
                  key={`customer-${customer.id}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          customer.name
                        )} flex items-center justify-center text-white font-medium text-sm`}
                      >
                        {getCustomerInitials(customer.name)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{getPrimaryAddress(customer)}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center text-sm text-gray-600">
                    {getPrimaryCep(customer)}
                  </TableCell>

                  <TableCell className="text-center text-sm text-gray-600">
                    {formatPhone(customer.cellphone)}
                  </TableCell>

                  <TableCell className="text-center text-sm text-gray-600">
                    {formatDate(customer.created_at)}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleToggleAddresses(customer.id)}
                        title="Ver endereços"
                      >
                        {expandedCustomer === customer.id ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditCustomer(customer)}
                        title="Editar cliente"
                      >
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        disabled={deletingCustomer === customer.id}
                        title="Excluir cliente"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Linha expandida com endereços */}
                {expandedCustomer === customer.id && (
                  <TableRow key={`addresses-${customer.id}`} className="bg-gray-50">
                    <TableCell colSpan={6} className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-gray-600" />
                            <h4 className="font-semibold text-gray-900">
                              Endereços de {customer.name}
                            </h4>
                          </div>
                          <Button
                            onClick={() => handleAddAddress(customer)}
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Adicionar Endereço
                          </Button>
                        </div>

                        {customer.addresses && customer.addresses.length > 0 ? (
                          <div className="grid gap-4 md:grid-cols-2">
                            {customer.addresses.map((address, index) => (
                              <div
                                key={`address-${address.id}`}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    Endereço {index + 1}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleEditAddress(address, customer)}
                                      title="Editar endereço"
                                    >
                                      <Edit className="h-3 w-3 text-gray-500" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => handleDeleteAddress(address.id, customer.id)}
                                      disabled={deletingAddress === address.id}
                                      title="Excluir endereço"
                                    >
                                      <Trash2 className="h-3 w-3 text-gray-500" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                  <div className="flex justify-between">
                                    <span className="font-medium">CEP:</span>
                                    <span>{formatCep(address.postal_code)}</span>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span className="font-medium">Rua:</span>
                                    <span className="text-right">{address.street}</span>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span className="font-medium">Número:</span>
                                    <span>{address.number}</span>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span className="font-medium">Bairro:</span>
                                    <span>{address.neighborhood}</span>
                                  </div>
                                  
                                  {address.complement && (
                                    <div className="flex justify-between">
                                      <span className="font-medium">Complemento:</span>
                                      <span className="text-right">{address.complement}</span>
                                    </div>
                                  )}

                                  {address.created_at && (
                                    <div className="flex justify-between pt-2 border-t border-gray-100">
                                      <span className="font-medium">Cadastrado em:</span>
                                      <span>{formatDate(address.created_at)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">
                              Nenhum endereço cadastrado
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Este cliente ainda não possui endereços cadastrados
                            </p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {/* Modal de edição de cliente */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        customer={selectedCustomer}
        onClose={handleCloseEditModal}
        onCustomerUpdated={onCustomerUpdated}
      />

      {/* Modal de adicionar endereço */}
      <CreateAddressModal
        isOpen={isAddressModalOpen}
        customerId={selectedCustomerForAddress?.id || null}
        customerName={selectedCustomerForAddress?.name || ""}
        onClose={handleCloseAddressModal}
        onAddressCreated={onCustomerUpdated}
      />

      {/* Modal de editar endereço */}
      <EditAddressModal
        isOpen={isEditAddressModalOpen}
        address={selectedAddress}
        customerName={selectedCustomerForAddress?.name || ""}
        onClose={handleCloseEditAddressModal}
        onAddressUpdated={onCustomerUpdated}
      />
    </>
  );
}