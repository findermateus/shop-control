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
import { Edit, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import EditCustomerModal from "@/components/shared/customers/customer-modal-edit";

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCustomer(null);
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
              <TableRow
                key={customer.id}
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
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MapPin className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <Edit className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleDeleteCustomer(customer.id)}
                      disabled={deletingCustomer === customer.id}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum cliente encontrado
          </div>
        )}
      </div>

      {/* Modal de edição */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        customer={selectedCustomer}
        onClose={handleCloseEditModal}
        onCustomerUpdated={onCustomerUpdated}
      />
    </>
  );
}